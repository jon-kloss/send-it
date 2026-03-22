import { useState, useCallback, useRef, useEffect } from "react";

interface BeforeAfterState {
  beforeFiles: Record<string, string>;
  stepId: number | null;
}

export function useBeforeAfter(
  currentStep: number,
  hasBeforeAfter: boolean,
  currentFiles: Record<string, string>
) {
  const [state, setState] = useState<BeforeAfterState>({
    beforeFiles: {},
    stepId: null,
  });
  const [showingBefore, setShowingBefore] = useState(false);
  // Track whether new file changes have happened since the snapshot was taken
  const filesAtAdvanceRef = useRef<string>("");

  // When entering a before/after step, capture "before" snapshot
  useEffect(() => {
    if (hasBeforeAfter && state.stepId !== currentStep) {
      setState({
        beforeFiles: { ...currentFiles },
        stepId: currentStep,
      });
      setShowingBefore(false);
      filesAtAdvanceRef.current = "";
    }
  }, [currentStep, hasBeforeAfter]); // eslint-disable-line react-hooks/exhaustive-deps

  // When step advances away from a before/after step, snapshot current files
  // so we can detect when NEW changes happen and clear the toggle
  useEffect(() => {
    if (!hasBeforeAfter && state.stepId !== null) {
      // We just left a before/after step — record what files look like now
      filesAtAdvanceRef.current = hashFiles(currentFiles);
    }
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear the snapshot when new file changes happen on a non-before/after step
  useEffect(() => {
    if (!hasBeforeAfter && state.stepId !== null && filesAtAdvanceRef.current) {
      const currentHash = hashFiles(currentFiles);
      if (currentHash !== filesAtAdvanceRef.current) {
        // New changes happened — clear the before/after
        setState({ beforeFiles: {}, stepId: null });
        setShowingBefore(false);
        filesAtAdvanceRef.current = "";
      }
    }
  }, [currentFiles, hasBeforeAfter, state.stepId]);

  const captureAfter = useCallback(
    (_files: Record<string, string>) => {
      // no-op now — we just keep the before snapshot and compare against live files
    },
    []
  );

  const toggleBeforeAfter = useCallback(() => {
    setShowingBefore((prev) => !prev);
  }, []);

  // Files to display in preview (override if showing "before")
  const displayFiles =
    showingBefore && state.stepId !== null ? state.beforeFiles : currentFiles;

  // Show toggle as long as we have a snapshot (even after advancing steps)
  const canToggle = state.stepId !== null;

  return {
    displayFiles,
    showingBefore,
    canToggle,
    toggleBeforeAfter,
    captureAfter,
  };
}

function hashFiles(files: Record<string, string>): string {
  const entries = Object.entries(files).sort(([a], [b]) => a.localeCompare(b));
  return entries
    .map(([key, val]) => `${key}:${val.length}`)
    .join("|");
}
