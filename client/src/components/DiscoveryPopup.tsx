import { useState, useCallback } from "react";
import type { GlossaryPopup } from "../hooks/useGlossary";

interface DiscoveryPopupProps {
  popup: GlossaryPopup;
  onDismiss: () => void;
}

export default function DiscoveryPopup({
  popup,
  onDismiss,
}: DiscoveryPopupProps) {
  const [fading, setFading] = useState(false);

  const handleDismiss = useCallback(() => {
    setFading(true);
    setTimeout(onDismiss, 400);
  }, [onDismiss]);

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: fading ? 0 : 1,
      }}
      onClick={handleDismiss}
    >
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <span style={styles.emoji}>{popup.emoji}</span>
          <h3 style={styles.title}>{popup.title}</h3>
        </div>

        {popup.paragraphs.map((p, i) => (
          <p key={i} style={styles.body}>
            {p}
          </p>
        ))}

        <div style={styles.footer}>
          <span style={styles.glossaryHint}>
            📖 Added to your Glossary
          </span>
          <button onClick={handleDismiss} style={styles.button}>
            Got it!
          </button>
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
    zIndex: 5000,
    padding: "20px",
    transition: "opacity 0.4s ease",
  },
  popup: {
    maxWidth: "460px",
    width: "100%",
    backgroundColor: "#252526",
    border: "1px solid #569cd6",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  emoji: {
    fontSize: "28px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#ffffff",
    margin: 0,
  },
  body: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#d4d4d4",
    margin: "0 0 12px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  glossaryHint: {
    fontSize: "12px",
    color: "#808080",
  },
  button: {
    padding: "8px 20px",
    backgroundColor: "#0e639c",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
