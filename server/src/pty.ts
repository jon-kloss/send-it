import pty, { type IPty } from "node-pty";
import { WebSocket } from "ws";
import { existsSync } from "node:fs";
import { mkdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

interface TerminalMessage {
  type: "input" | "resize";
  data?: string;
  cols?: number;
  rows?: number;
}

interface ServerMessage {
  type: "output" | "error";
  data?: string;
  message?: string;
}

function findShell(): string {
  const candidates = [
    process.env.SHELL,
    "/bin/zsh",
    "/bin/bash",
    "/bin/sh",
  ];
  for (const shell of candidates) {
    if (shell && existsSync(shell)) {
      return shell;
    }
  }
  return "/bin/sh";
}

export function getWorkspaceDir(): string {
  const dir = path.join(os.homedir(), "htcgf-workspace");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

const activeSessions = new Map<WebSocket, IPty>();

export function getActiveSessionCount(): number {
  return activeSessions.size;
}

export function handleTerminalConnection(ws: WebSocket): void {
  // If a session already exists (e.g. page refresh), clean up the old one
  // so the new connection can take over
  if (activeSessions.size >= 1) {
    console.log("[pty] Replacing existing session (likely a page refresh)");
    for (const [oldWs] of activeSessions) {
      cleanup(oldWs);
      try {
        oldWs.close();
      } catch {
        // already closed
      }
    }
  }

  const shell = findShell();
  const workspaceDir = getWorkspaceDir();

  let ptyProcess: IPty;
  try {
    ptyProcess = pty.spawn(shell, [], {
      name: "xterm-256color",
      cols: 80,
      rows: 24,
      cwd: workspaceDir,
      env: {
        ...process.env,
        TERM: "xterm-256color",
      } as Record<string, string>,
    });
  } catch (err) {
    const msg: ServerMessage = {
      type: "error",
      message: `Failed to start shell: ${err instanceof Error ? err.message : String(err)}`,
    };
    ws.send(JSON.stringify(msg));
    ws.close();
    return;
  }

  activeSessions.set(ws, ptyProcess);
  console.log(
    `[pty] Session started (pid: ${ptyProcess.pid}, shell: ${shell}, cwd: ${workspaceDir})`
  );


  ptyProcess.onData((data: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      const msg: ServerMessage = { type: "output", data };
      ws.send(JSON.stringify(msg));
    }
  });

  ptyProcess.onExit(({ exitCode }) => {
    console.log(`[pty] Process exited (code: ${exitCode})`);
    activeSessions.delete(ws);
    if (ws.readyState === WebSocket.OPEN) {
      const msg: ServerMessage = {
        type: "error",
        message: `Shell exited with code ${exitCode}`,
      };
      ws.send(JSON.stringify(msg));
      ws.close();
    }
  });

  ws.on("message", (rawData) => {
    try {
      const msg: TerminalMessage = JSON.parse(rawData.toString());

      switch (msg.type) {
        case "input":
          if (msg.data !== undefined) {
            ptyProcess.write(msg.data);
          }
          break;
        case "resize":
          if (
            msg.cols !== undefined &&
            msg.rows !== undefined &&
            msg.cols > 0 &&
            msg.rows > 0
          ) {
            ptyProcess.resize(msg.cols, msg.rows);
          }
          break;
      }
    } catch {
      // Ignore malformed messages
    }
  });

  ws.on("close", () => {
    console.log("[pty] WebSocket closed, cleaning up PTY process");
    cleanup(ws);
  });

  ws.on("error", (err) => {
    console.error("[pty] WebSocket error:", err.message);
    cleanup(ws);
  });
}

function cleanup(ws: WebSocket): void {
  const ptyProcess = activeSessions.get(ws);
  if (ptyProcess) {
    try {
      ptyProcess.kill();
    } catch {
      // Process may already be dead
    }
    activeSessions.delete(ws);
    console.log("[pty] PTY process cleaned up");
  }
}

export function cleanupAllSessions(): void {
  for (const [ws, ptyProcess] of activeSessions) {
    try {
      ptyProcess.kill();
    } catch {
      // Process may already be dead
    }
    try {
      ws.close();
    } catch {
      // WebSocket may already be closed
    }
  }
  activeSessions.clear();
  console.log("[pty] All sessions cleaned up");
}
