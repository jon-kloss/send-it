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
    <button onClick={handleCopy} style={styles.card}>
      <div style={styles.promptText}>{prompt.text}</div>
      <div style={styles.footer}>
        <span style={styles.description}>{prompt.description}</span>
        <span style={styles.copyHint}>
          {copied ? "Copied! ✓" : "Click to copy"}
        </span>
      </div>
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "block",
    width: "100%",
    textAlign: "left",
    background: "#2d2d30",
    border: "1px solid #3e3e42",
    borderRadius: "8px",
    padding: "12px 14px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    color: "#d4d4d4",
    fontFamily: "inherit",
    fontSize: "inherit",
    marginBottom: "8px",
  },
  promptText: {
    fontFamily: '"Cascadia Code", "Fira Code", Menlo, monospace',
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#ce9178",
    marginBottom: "8px",
    wordBreak: "break-word" as const,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
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
