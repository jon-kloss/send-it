import { useState, useCallback, useRef, useEffect } from "react";

interface BeforeAfterState {
  beforeFiles: Record<string, string>;
  afterFiles: Record<string, string> | null;
  stepId: number | null;
}

export function useBeforeAfter(
  currentStep: number,
  hasBeforeAfter: boolean,
  currentFiles: Record<string, string>
) {
  const [state, setState] = useState<BeforeAfterState>({
    beforeFiles: {},
    afterFiles: null,
    stepId: null,
  });
  const [showingBefore, setShowingBefore] = useState(false);
  const capturedRef = useRef(false);

  // When entering a before/after step, capture "before" snapshot
  useEffect(() => {
    if (hasBeforeAfter && state.stepId !== currentStep) {
      setState({
        beforeFiles: { ...currentFiles },
        afterFiles: null,
        stepId: currentStep,
      });
      setShowingBefore(false);
      capturedRef.current = true;
    }
    if (!hasBeforeAfter) {
      // Reset when leaving a before/after step
      if (state.stepId !== null) {
        setState({ beforeFiles: {}, afterFiles: null, stepId: null });
        setShowingBefore(false);
      }
    }
  }, [currentStep, hasBeforeAfter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Capture "after" when step completes (called from onComplete)
  const captureAfter = useCallback(
    (files: Record<string, string>) => {
      setState((prev) => ({
        ...prev,
        afterFiles: { ...files },
      }));
    },
    []
  );

  const toggleBeforeAfter = useCallback(() => {
    setShowingBefore((prev) => !prev);
  }, []);

  // Files to display in preview (override if showing "before")
  const displayFiles =
    showingBefore && state.stepId !== null ? state.beforeFiles : currentFiles;

  const canToggle = state.stepId !== null && hasBeforeAfter;

  return {
    displayFiles,
    showingBefore,
    canToggle,
    toggleBeforeAfter,
    captureAfter,
  };
}
