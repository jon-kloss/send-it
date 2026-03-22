import { useState, useCallback } from "react";
import type { PromptExample } from "../tutorial/types";

interface PromptCardProps {
  prompt: PromptExample;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-HTTPS
      const textarea = document.createElement("textarea");
      textarea.value = prompt.text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt.text]);

  return (
    <div
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      style={{
        ...styles.card,
        cursor: "pointer",
      }}
    >
      <div style={styles.promptText}>{prompt.text}</div>
      <div style={styles.footer}>
        <span style={styles.description}>{prompt.description}</span>
        <span style={styles.copyHint}>
          {copied ? "Copied! ✓" : "Click to copy"}
        </span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "block",
    width: "100%",
    textAlign: "left" as const,
    background: "#2d2d30",
    border: "1px solid #3e3e42",
    borderRadius: "8px",
    padding: "12px 14px",
    transition: "all 0.15s ease",
    color: "#d4d4d4",
    fontSize: "14px",
    marginBottom: "8px",
    userSelect: "none" as const,
    boxSizing: "border-box" as const,
  },
  promptText: {
    fontFamily: '"Cascadia Code", "Fira Code", Menlo, monospace',
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#ce9178",
    marginBottom: "8px",
    wordBreak: "break-word" as const,
    pointerEvents: "none" as const,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    pointerEvents: "none" as const,
  },
  description: {
    color: "#808080",
  },
  copyHint: {
    color: "#569cd6",
    fontSize: "11px",
    fontWeight: 500,
  },
};
