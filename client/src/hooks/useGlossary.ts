import { useState, useEffect, useCallback, useRef } from "react";
import {
  GLOSSARY,
  DEFAULT_DISCOVERED_TERMS,
  type GlossaryEntry,
} from "../tutorial/glossary";
import type { SocketMessage } from "./useSocket";

const STORAGE_KEY = "htcgf-glossary-discovered";
const POPUP_SEEN_KEY = "htcgf-glossary-popups-seen";

interface GlossaryToast {
  term: string;
  id: number;
}

export interface GlossaryPopup {
  emoji: string;
  title: string;
  paragraphs: string[];
  term: string;
}

function loadDiscovered(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_DISCOVERED_TERMS];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEFAULT_DISCOVERED_TERMS];
    return parsed;
  } catch {
    return [...DEFAULT_DISCOVERED_TERMS];
  }
}

function saveDiscovered(terms: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
  } catch {
    // ignore
  }
}

function loadPopupsSeen(): string[] {
  try {
    const raw = localStorage.getItem(POPUP_SEEN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function savePopupsSeen(seen: string[]): void {
  try {
    localStorage.setItem(POPUP_SEEN_KEY, JSON.stringify(seen));
  } catch {
    // ignore
  }
}

export function useGlossary(
  addMessageHandler: (handler: (msg: SocketMessage) => void) => () => void
) {
  const [discoveredTerms, setDiscoveredTerms] = useState<string[]>(loadDiscovered);
  const [toasts, setToasts] = useState<GlossaryToast[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [popupQueue, setPopupQueue] = useState<GlossaryPopup[]>([]);
  const [popupsSeen, setPopupsSeen] = useState<string[]>(loadPopupsSeen);
  const toastIdRef = useRef(0);
  const terminalBufferRef = useRef("");

  // Persist discovered terms
  useEffect(() => {
    saveDiscovered(discoveredTerms);
  }, [discoveredTerms]);

  // Persist popups seen
  useEffect(() => {
    savePopupsSeen(popupsSeen);
  }, [popupsSeen]);

  const discoverTerm = useCallback(
    (term: string) => {
      setDiscoveredTerms((prev) => {
        if (prev.includes(term)) return prev;
        return [...prev, term];
      });

      // Check if this term has a first-time popup
      const entry = GLOSSARY.find((e) => e.term === term);
      if (entry?.firstTimePopup && !popupsSeen.includes(term)) {
        setPopupQueue((prev) => [
          ...prev,
          { ...entry.firstTimePopup!, term },
        ]);
        setPopupsSeen((prev) => [...prev, term]);
      } else {
        // Show toast (no toast if popup is showing)
        const id = ++toastIdRef.current;
        setToasts((prev) => [...prev, { term, id }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
      }
    },
    [popupsSeen]
  );

  const dismissPopup = useCallback(() => {
    setPopupQueue((prev) => prev.slice(1));
  }, []);

  const activePopup = popupQueue.length > 0 ? popupQueue[0] : null;

  // Watch terminal output for glossary terms
  useEffect(() => {
    return addMessageHandler((msg: SocketMessage) => {
      if (msg.type !== "output" || !msg.data) return;

      terminalBufferRef.current += msg.data;
      if (terminalBufferRef.current.length > 4000) {
        terminalBufferRef.current = terminalBufferRef.current.slice(-4000);
      }
    });
  }, [addMessageHandler]);

  // Periodically scan terminal buffer for new terms
  useEffect(() => {
    const interval = setInterval(() => {
      const rawBuffer = terminalBufferRef.current;
      if (!rawBuffer) return;

      // Strip ANSI escape codes so regexes match clean text
      const buffer = stripAnsi(rawBuffer);

      for (const entry of GLOSSARY) {
        if (discoveredTerms.includes(entry.term)) continue;
        if (entry.detectPatterns.length === 0) continue;

        for (const pattern of entry.detectPatterns) {
          if (pattern.test(buffer)) {
            discoverTerm(entry.term);
            break;
          }
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [discoveredTerms, discoverTerm]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const discoveredEntries: GlossaryEntry[] = GLOSSARY.filter((e) =>
    discoveredTerms.includes(e.term)
  );

  const resetGlossary = useCallback(() => {
    setDiscoveredTerms([...DEFAULT_DISCOVERED_TERMS]);
    setPopupsSeen([]);
  }, []);

  return {
    discoveredEntries,
    discoveredCount: discoveredTerms.length,
    totalCount: GLOSSARY.length,
    toasts,
    modalOpen,
    openModal,
    closeModal,
    activePopup,
    popupQueueLength: popupQueue.length,
    dismissPopup,
    resetGlossary,
  };
}

// Strip ANSI escape codes (colors, cursor movement, etc.) from terminal output
// so regex patterns can match clean text
function stripAnsi(str: string): string {
  return (
    str
      // Standard ANSI escape sequences (colors, cursor, etc.)
      // eslint-disable-next-line no-control-regex
      .replace(/\x1b\[[0-9;?]*[a-zA-Z]/g, "")
      // OSC sequences (title setting, etc.)
      // eslint-disable-next-line no-control-regex
      .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
      // Single-char escape sequences
      // eslint-disable-next-line no-control-regex
      .replace(/\x1b[()][AB012]/g, "")
      // Any remaining lone ESC
      // eslint-disable-next-line no-control-regex
      .replace(/\x1b/g, "")
  );
}
