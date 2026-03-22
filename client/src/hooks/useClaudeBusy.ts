import { useState, useEffect, useRef, useCallback } from "react";
import type { SocketMessage } from "./useSocket";

const IDLE_THRESHOLD_MS = 1000;
// Minimum output length to count as "real" output (filters cursor blinks, escape sequences)
const MIN_OUTPUT_LENGTH = 3;

export function useClaudeBusy(
  addMessageHandler: (handler: (msg: SocketMessage) => void) => () => void
) {
  const [busy, setBusy] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setBusy(false);
    }, IDLE_THRESHOLD_MS);
  }, []);

  useEffect(() => {
    return addMessageHandler((msg: SocketMessage) => {
      if (msg.type === "output" && msg.data && msg.data.length >= MIN_OUTPUT_LENGTH) {
        setBusy(true);
        resetIdleTimer();
      }
    });
  }, [addMessageHandler, resetIdleTimer]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return busy;
}
