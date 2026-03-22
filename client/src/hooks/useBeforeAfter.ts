import { useState, useCallback, useRef, useEffect } from "react";

export function useBeforeAfter(
  currentStep: number,
  hasBeforeAfter: boolean,
  currentFiles: Record<string, string>
) {
  const [beforeFiles, setBeforeFiles] = useState<Record<string, string>>({});
  const [showingBefore, setShowingBefore] = useState(false);
  const [hasSnapshot, setHasSnapshot] = useState(false);
  const snapshotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When entering a before/after step, wait for files to settle then snapshot
  useEffect(() => {
    // Clear any pending snapshot timer
    if (snapshotTimerRef.current) {
      clearTimeout(snapshotTimerRef.current);
      snapshotTimerRef.current = null;
    }

    setShowingBefore(false);

    if (hasBeforeAfter) {
      // Delay snapshot by 3s to let files from the previous step settle
      snapshotTimerRef.current = setTimeout(() => {
        setBeforeFiles({ ...currentFiles });
        setHasSnapshot(true);
      }, 3000);
    } else {
      // Keep the snapshot around for non-before/after steps
      // It'll be cleared when the user runs a new prompt (files change)
    }

    return () => {
      if (snapshotTimerRef.current) {
        clearTimeout(snapshotTimerRef.current);
      }
    };
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear snapshot when files change on a non-before/after step
  // (user ran a new prompt, so before/after is no longer relevant)
  const prevFilesHashRef = useRef("");
  useEffect(() => {
    if (!hasBeforeAfter && hasSnapshot) {
      const hash = hashFiles(currentFiles);
      if (prevFilesHashRef.current && hash !== prevFilesHashRef.current) {
        setHasSnapshot(false);
        setBeforeFiles({});
        setShowingBefore(false);
      }
      prevFilesHashRef.current = hash;
    }
  }, [currentFiles, hasBeforeAfter, hasSnapshot]);

  // Reset prevFilesHash when step changes
  useEffect(() => {
    prevFilesHashRef.current = hashFiles(currentFiles);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleBeforeAfter = useCallback(() => {
    setShowingBefore((prev) => !prev);
  }, []);

  const captureAfter = useCallback(() => {}, []);

  const displayFiles =
    showingBefore && hasSnapshot ? beforeFiles : currentFiles;

  const canToggle = hasSnapshot && Object.keys(beforeFiles).length > 0;

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
