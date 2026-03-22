interface GlossaryToastProps {
  toasts: Array<{ term: string; id: number }>;
  onOpenGlossary: () => void;
}

export default function GlossaryToast({
  toasts,
  onOpenGlossary,
}: GlossaryToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div style={styles.container}>
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={onOpenGlossary}
          style={styles.toast}
        >
          <span style={styles.icon}>📖</span>
          <span style={styles.text}>
            New term discovered: <strong>{toast.term}</strong>
          </span>
          <span style={styles.hint}>Click to view</span>
        </button>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "fixed",
    bottom: "340px",
    right: "20px",
    zIndex: 2500,
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  toast: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    backgroundColor: "#2d2d30",
    border: "1px solid #d7ba7d",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    cursor: "pointer",
    color: "#d4d4d4",
    fontSize: "13px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    animation: "slideIn 0.3s ease",
    whiteSpace: "nowrap" as const,
  },
  icon: {
    fontSize: "16px",
  },
  text: {
    color: "#d4d4d4",
  },
  hint: {
    color: "#808080",
    fontSize: "11px",
    marginLeft: "4px",
  },
};
