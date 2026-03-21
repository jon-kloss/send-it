import { useEffect, useRef, useCallback, useState } from "react";

const WS_URL = "ws://localhost:3001/terminal";

export interface SocketMessage {
  type: string;
  data?: string;
  message?: string;
  files?: Record<string, string>;
  path?: string;
}

type MessageHandler = (msg: SocketMessage) => void;

export function useSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const handlersRef = useRef<Set<MessageHandler>>(new Set());

  const addMessageHandler = useCallback((handler: MessageHandler) => {
    handlersRef.current.add(handler);
    return () => {
      handlersRef.current.delete(handler);
    };
  }, []);

  const send = useCallback((msg: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const msg: SocketMessage = JSON.parse(event.data);
        for (const handler of handlersRef.current) {
          handler(msg);
        }
      } catch {
        // Ignore malformed messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onerror = () => {
      setConnected(false);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, []);

  return { send, connected, addMessageHandler };
}
