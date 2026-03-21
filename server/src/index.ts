import express from "express";
import { createServer } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import {
  handleTerminalConnection,
  cleanupAllSessions,
  getActiveSessionCount,
} from "./pty.js";

const PORT = parseInt(process.env.PORT || "3001", 10);
const HEARTBEAT_INTERVAL = 30_000;
const HEARTBEAT_TIMEOUT = 10_000;

const app = express();
const httpServer = createServer(app);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    activeSessions: getActiveSessionCount(),
  });
});

// WebSocket server for terminal
const wss = new WebSocketServer({ noServer: true });

// Track alive state for heartbeat
const aliveClients = new WeakSet<WebSocket>();

wss.on("connection", (ws) => {
  aliveClients.add(ws);

  ws.on("pong", () => {
    aliveClients.add(ws);
  });

  handleTerminalConnection(ws);
});

// Heartbeat: ping every 30s, terminate if no pong within 10s
const heartbeatInterval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!aliveClients.has(ws)) {
      console.log("[ws] Terminating zombie connection (no pong)");
      ws.terminate();
      continue;
    }
    aliveClients.delete(ws);
    ws.ping();
  }
}, HEARTBEAT_INTERVAL);

wss.on("close", () => {
  clearInterval(heartbeatInterval);
});

// Handle HTTP upgrade for WebSocket on /terminal path
httpServer.on("upgrade", (request, socket, head) => {
  const url = new URL(request.url || "/", `http://localhost:${PORT}`);

  if (url.pathname === "/terminal") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Graceful shutdown
function shutdown() {
  console.log("\n[server] Shutting down...");
  cleanupAllSessions();
  clearInterval(heartbeatInterval);
  wss.close();
  httpServer.close(() => {
    console.log("[server] Goodbye.");
    process.exit(0);
  });
  // Force exit after 5s if graceful shutdown stalls
  setTimeout(() => process.exit(1), 5000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start server
httpServer.listen(PORT, () => {
  console.log(`[server] HTCGF backend running on http://localhost:${PORT}`);
  console.log(`[server] WebSocket terminal at ws://localhost:${PORT}/terminal`);
}).on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `[server] Port ${PORT} already in use. Kill the existing process or set PORT env var.`
    );
    process.exit(1);
  }
  throw err;
});
