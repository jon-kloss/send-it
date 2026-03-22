import { useEffect, useRef, useCallback } from "react";
import type { TutorialStep } from "../tutorial/types";
import type { SocketMessage } from "./useSocket";

const STEP_COOLDOWN_MS = 5000;

interface UseAutoCompleteOptions {
  currentStep: TutorialStep | undefined;
  files: Record<string, string>;
  addMessageHandler: (handler: (msg: SocketMessage) => void) => () => void;
  onStepComplete: () => void;
  completedSteps: number[];
  claudeBusy: boolean;
}

export function useAutoComplete({
  currentStep,
  files,
  addMessageHandler,
  onStepComplete,
  completedSteps,
  claudeBusy,
}: UseAutoCompleteOptions) {
  const terminalBufferRef = useRef("");
  const filesSnapshotRef = useRef<string>("");
  const completedRef = useRef(false);
  const pendingRef = useRef(false);
  const stepStartTimeRef = useRef(0);
  const cooldownSnapshotTakenRef = useRef(false);
  const onStepCompleteRef = useRef(onStepComplete);
  onStepCompleteRef.current = onStepComplete;

  // Reset when step changes
  useEffect(() => {
    terminalBufferRef.current = "";
    completedRef.current = false;
    pendingRef.current = false;
    cooldownSnapshotTakenRef.current = false;
    stepStartTimeRef.current = Date.now();
    filesSnapshotRef.current = hashFiles(files);
  }, [currentStep?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for terminal output
  useEffect(() => {
    return addMessageHandler((msg: SocketMessage) => {
      if (msg.type === "output" && msg.data) {
        terminalBufferRef.current += msg.data;
        if (terminalBufferRef.current.length > 4000) {
          terminalBufferRef.current = terminalBufferRef.current.slice(-4000);
        }
      }
    });
  }, [addMessageHandler]);

  const fireCompletion = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setTimeout(() => {
      onStepCompleteRef.current();
    }, 1500);
  }, []);

  // Single check function that both detects criteria AND fires completion
  const tick = useCallback(() => {
    if (completedRef.current) return;
    if (!currentStep?.completionCheck) return;
    if (completedSteps.includes(currentStep.id)) return;

    const check = currentStep.completionCheck;
    const isTerminalCheck = !!check.terminalPattern;
    const elapsed = Date.now() - stepStartTimeRef.current;

    // Check terminal pattern (no cooldown, fires immediately)
    if (isTerminalCheck) {
      const cleanBuffer = stripAnsi(terminalBufferRef.current);
      if (check.terminalPattern!.test(cleanBuffer)) {
        fireCompletion();
        return;
      }
    }

    // For file-based checks, enforce cooldown
    if (!isTerminalCheck) {
      if (elapsed < STEP_COOLDOWN_MS) return;

      if (!cooldownSnapshotTakenRef.current) {
        cooldownSnapshotTakenRef.current = true;
        filesSnapshotRef.current = hashFiles(files);
        return;
      }

      // Check criteria
      let met = false;

      if (check.hasFileWithExtension) {
        const fileKeys = Object.keys(files);
        met = check.hasFileWithExtension.some((ext) =>
          fileKeys.some((f) => f.endsWith(ext))
        );
      }

      if (!met && check.fileContentPattern) {
        const allContent = Object.values(files).join("\n");
        met = check.fileContentPattern.test(allContent);
      }

      if (!met && check.anyFileChange) {
        const currentHash = hashFiles(files);
        met =
          currentHash !== filesSnapshotRef.current &&
          Object.keys(files).length > 0;
      }

      if (met) {
        pendingRef.current = true;
      }

      // Fire when criteria met and Claude is idle
      if (pendingRef.current && !claudeBusy) {
        fireCompletion();
      }
    }
  }, [currentStep, files, completedSteps, claudeBusy, fireCompletion]);

  // Run on file changes
  useEffect(() => {
    tick();
  }, [tick]);

  // Poll every second
  useEffect(() => {
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);
}

function stripAnsi(str: string): string {
  return str
    // eslint-disable-next-line no-control-regex
    .replace(/\x1b\[[0-9;?]*[a-zA-Z]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/\x1b[()][AB012]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/\x1b/g, "");
}

function hashFiles(files: Record<string, string>): string {
  const entries = Object.entries(files).sort(([a], [b]) => a.localeCompare(b));
  return entries
    .map(([key, val]) => `${key}:${val.length}:${val.slice(0, 20)}:${val.slice(-20)}`)
    .join("|");
}
