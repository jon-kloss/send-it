import { useState } from "react";
import type { GlossaryEntry } from "../tutorial/glossary";

interface GlossaryModalProps {
  entries: GlossaryEntry[];
  discoveredCount: number;
  totalCount: number;
  onClose: () => void;
}

export default function GlossaryModal({
  entries,
  discoveredCount,
  totalCount,
  onClose,
}: GlossaryModalProps) {
  const [search, setSearch] = useState("");

  const filtered = entries.filter(
    (e) =>
      e.term.toLowerCase().includes(search.toLowerCase()) ||
      e.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>📖 Glossary</h2>
            <p style={styles.subtitle}>
              {discoveredCount} of {totalCount} terms discovered — keep
              going to find more!
            </p>
          </div>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
            autoFocus
          />
        </div>

        <div style={styles.entries}>
          {filtered.length === 0 && (
            <p style={styles.emptyMessage}>
              {search
                ? "No matching terms found."
                : "Keep using Claude to discover new terms!"}
            </p>
          )}
          {filtered.map((entry) => (
            <div key={entry.term} style={styles.entry}>
              <h3 style={styles.entryTerm}>{entry.term}</h3>
              <p style={styles.entryDefinition}>{entry.definition}</p>
            </div>
          ))}
          {/* Show undiscovered terms as locked */}
          {!search &&
            Array.from({ length: totalCount - discoveredCount }).map(
              (_, i) => (
                <div key={`locked-${i}`} style={styles.lockedEntry}>
                  <span style={styles.lockIcon}>🔒</span>
                  <span style={styles.lockedText}>
                    Keep building to discover this term!
                  </span>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4000,
    padding: "20px",
  },
  modal: {
    maxWidth: "520px",
    width: "100%",
    maxHeight: "80vh",
    backgroundColor: "#1e1e1e",
    border: "1px solid #3e3e42",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 20px 12px",
    borderBottom: "1px solid #3e3e42",
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 4px",
  },
  subtitle: {
    fontSize: "12px",
    color: "#808080",
    margin: 0,
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#808080",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    lineHeight: 1,
  },
  searchContainer: {
    padding: "12px 20px",
  },
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "#2d2d30",
    border: "1px solid #3e3e42",
    borderRadius: "6px",
    color: "#d4d4d4",
    fontSize: "14px",
    outline: "none",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    boxSizing: "border-box" as const,
  },
  entries: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "4px 20px 20px",
  },
  emptyMessage: {
    textAlign: "center" as const,
    color: "#808080",
    fontSize: "14px",
    padding: "20px 0",
  },
  entry: {
    padding: "12px 0",
    borderBottom: "1px solid #2d2d30",
  },
  entryTerm: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#569cd6",
    margin: "0 0 4px",
  },
  entryDefinition: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#d4d4d4",
    margin: 0,
  },
  lockedEntry: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 0",
    borderBottom: "1px solid #2d2d30",
  },
  lockIcon: {
    fontSize: "14px",
  },
  lockedText: {
    fontSize: "13px",
    color: "#555",
    fontStyle: "italic" as const,
  },
};
