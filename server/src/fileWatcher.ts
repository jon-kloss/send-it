import chokidar, { type FSWatcher } from "chokidar";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const WATCHED_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".json",
  ".svg",
  ".md",
]);

const IGNORED_PATTERNS = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/package-lock.json",
  "**/.DS_Store",
];

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const DEBOUNCE_MS = 150;

export type FileChangeCallback = (files: Record<string, string>) => void;
export type FileDeleteCallback = (filePath: string) => void;

interface FileWatcherOptions {
  workspaceDir: string;
  onChange: FileChangeCallback;
  onDelete: FileDeleteCallback;
}

let watcher: FSWatcher | null = null;
let pendingChanges = new Map<string, boolean>(); // path -> true=changed, false=deleted (unused but conceptual)
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function isWatchedFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return WATCHED_EXTENSIONS.has(ext);
}

function toSandpackPath(absolutePath: string, workspaceDir: string): string {
  const relative = path.relative(workspaceDir, absolutePath);
  // Sandpack expects paths starting with /
  return "/" + relative.replace(/\\/g, "/");
}

async function readFileIfValid(
  absolutePath: string
): Promise<string | null> {
  try {
    const stats = await stat(absolutePath);
    if (stats.size > MAX_FILE_SIZE) {
      console.log(
        `[fileWatcher] Skipping large file (${(stats.size / 1024).toFixed(0)}KB): ${absolutePath}`
      );
      return null;
    }
    const content = await readFile(absolutePath, "utf-8");
    return content;
  } catch {
    // File may have been deleted between event and read
    return null;
  }
}

async function flushPendingChanges(
  workspaceDir: string,
  onChange: FileChangeCallback
): Promise<void> {
  const changes = new Map(pendingChanges);
  pendingChanges.clear();

  const files: Record<string, string> = {};
  for (const [absolutePath] of changes) {
    const content = await readFileIfValid(absolutePath);
    if (content !== null) {
      const sandpackPath = toSandpackPath(absolutePath, workspaceDir);
      files[sandpackPath] = content;
    }
  }

  if (Object.keys(files).length > 0) {
    onChange(files);
  }
}

export function startWatching(options: FileWatcherOptions): void {
  if (watcher) {
    console.log("[fileWatcher] Already watching, skipping");
    return;
  }

  const { workspaceDir, onChange, onDelete } = options;

  console.log(`[fileWatcher] Watching: ${workspaceDir}`);

  watcher = chokidar.watch(workspaceDir, {
    ignored: IGNORED_PATTERNS,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 50,
    },
  });

  const scheduleFlush = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      flushPendingChanges(workspaceDir, onChange);
    }, DEBOUNCE_MS);
  };

  watcher.on("add", (filePath) => {
    if (!isWatchedFile(filePath)) return;
    console.log(`[fileWatcher] File added: ${toSandpackPath(filePath, workspaceDir)}`);
    pendingChanges.set(filePath, true);
    scheduleFlush();
  });

  watcher.on("change", (filePath) => {
    if (!isWatchedFile(filePath)) return;
    console.log(`[fileWatcher] File changed: ${toSandpackPath(filePath, workspaceDir)}`);
    pendingChanges.set(filePath, true);
    scheduleFlush();
  });

  watcher.on("unlink", (filePath) => {
    if (!isWatchedFile(filePath)) return;
    const sandpackPath = toSandpackPath(filePath, workspaceDir);
    console.log(`[fileWatcher] File deleted: ${sandpackPath}`);
    // Remove from pending changes if it was queued
    pendingChanges.delete(filePath);
    onDelete(sandpackPath);
  });

  watcher.on("error", (error: unknown) => {
    console.error("[fileWatcher] Error:", error instanceof Error ? error.message : String(error));
  });
}

export function stopWatching(): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  pendingChanges.clear();
  if (watcher) {
    watcher.close();
    watcher = null;
    console.log("[fileWatcher] Stopped watching");
  }
}

export async function readAllFiles(
  workspaceDir: string
): Promise<Record<string, string>> {
  const { readdir } = await import("node:fs/promises");
  const files: Record<string, string> = {};

  async function scanDir(dir: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip ignored directories
        if (
          entry.name === "node_modules" ||
          entry.name === ".git" ||
          entry.name === "dist"
        ) {
          continue;
        }
        await scanDir(fullPath);
      } else if (entry.isFile() && isWatchedFile(entry.name)) {
        const content = await readFileIfValid(fullPath);
        if (content !== null) {
          files[toSandpackPath(fullPath, workspaceDir)] = content;
        }
      }
    }
  }

  await scanDir(workspaceDir);
  return files;
}
