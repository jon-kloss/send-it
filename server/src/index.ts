import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import {
  handleTerminalConnection,
  cleanupAllSessions,
  getActiveSessionCount,
  getWorkspaceDir,
} from "./pty.js";
import {
  startWatching,
  stopWatching,
  readAllFiles,
} from "./fileWatcher.js";

const PORT = parseInt(process.env.PORT || "3001", 10);
const HEARTBEAT_INTERVAL = 30_000;

const app = express();
app.use(cors());
const httpServer = createServer(app);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    activeSessions: getActiveSessionCount(),
  });
});

// Get current workspace files for initial Sandpack load
app.get("/api/files", async (_req, res) => {
  try {
    const workspaceDir = getWorkspaceDir();
    const files = await readAllFiles(workspaceDir);
    res.json(files);
  } catch (err) {
    console.error("[api] Error reading files:", err);
    res.json({});
  }
});

// Reset everything: kill PTY, clear workspace files
app.post("/api/reset", async (_req, res) => {
  try {
    console.log("[api] Reset requested — killing sessions and clearing workspace");
    stopWatching();
    cleanupAllSessions();
    // Terminate all WebSocket connections immediately (not graceful close)
    for (const client of wss.clients) {
      client.terminate();
    }
    // Clear workspace files (but keep CLAUDE.md)
    const workspaceDir = getWorkspaceDir();
    const { readdir, rm } = await import("node:fs/promises");
    const entries = await readdir(workspaceDir);
    for (const entry of entries) {
      if (entry === "CLAUDE.md") continue;
      await rm(`${workspaceDir}/${entry}`, { recursive: true, force: true });
    }
    // Wait for PTY processes to fully exit before responding
    await new Promise((resolve) => setTimeout(resolve, 500));
    res.json({ status: "ok" });
  } catch (err) {
    console.error("[api] Reset error:", err);
    res.status(500).json({ error: "Reset failed" });
  }
});

// WebSocket server for terminal + file events
const wss = new WebSocketServer({ noServer: true });

// Track alive state for heartbeat
const aliveClients = new WeakSet<WebSocket>();

// Broadcast file changes to all connected WebSocket clients
function broadcastFiles(files: Record<string, string>): void {
  const msg = JSON.stringify({ type: "files", files });
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}

function broadcastFileDeleted(filePath: string): void {
  const msg = JSON.stringify({ type: "fileDeleted", path: filePath });
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  }
}

// Start/stop file watcher based on active connections
function manageFileWatcher(): void {
  const hasClients = wss.clients.size > 0;
  if (hasClients) {
    startWatching({
      workspaceDir: getWorkspaceDir(),
      onChange: broadcastFiles,
      onDelete: broadcastFileDeleted,
    });
  } else {
    stopWatching();
  }
}

wss.on("connection", (ws) => {
  aliveClients.add(ws);

  ws.on("pong", () => {
    aliveClients.add(ws);
  });

  ws.on("close", () => {
    // Check if we should stop the file watcher after a tick
    // (let the ws library update clients set first)
    setTimeout(manageFileWatcher, 100);
  });

  handleTerminalConnection(ws);
  manageFileWatcher();
});

// Heartbeat: ping every 30s, terminate if no pong
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
  stopWatching();
  cleanupAllSessions();
  clearInterval(heartbeatInterval);
  wss.close();
  httpServer.close(() => {
    console.log("[server] Goodbye.");
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start server
httpServer.listen(PORT, () => {
  console.log(`[server] SEND IT backend running on http://localhost:${PORT}`);
  console.log(`[server] WebSocket terminal at ws://localhost:${PORT}/terminal`);
  console.log(`[server] Workspace: ${getWorkspaceDir()}`);
}).on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `[server] Port ${PORT} already in use. Kill the existing process or set PORT env var.`
    );
    process.exit(1);
  }
  throw err;
});
