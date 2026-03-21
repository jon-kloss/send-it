import { useEffect, useState, useCallback } from "react";
import type { SocketMessage } from "./useSocket";

const API_URL = "http://localhost:3001/api/files";

export function useFiles(
  addMessageHandler: (handler: (msg: SocketMessage) => void) => () => void,
  connected: boolean
) {
  const [files, setFiles] = useState<Record<string, string>>({});

  // Fetch initial files when connected
  useEffect(() => {
    if (!connected) return;

    fetch(API_URL)
      .then((res) => res.json())
      .then((initialFiles: Record<string, string>) => {
        if (Object.keys(initialFiles).length > 0) {
          setFiles(initialFiles);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch initial files:", err);
      });
  }, [connected]);

  // Handle file change/delete messages from WebSocket
  const handleMessage = useCallback((msg: SocketMessage) => {
    if (msg.type === "files" && msg.files) {
      setFiles((prev) => ({ ...prev, ...msg.files! }));
    } else if (msg.type === "fileDeleted" && msg.path) {
      setFiles((prev) => {
        const next = { ...prev };
        delete next[msg.path!];
        return next;
      });
    }
  }, []);

  useEffect(() => {
    return addMessageHandler(handleMessage);
  }, [addMessageHandler, handleMessage]);

  return files;
}
