import { useState, useEffect } from "react";
import type { TutorialStep, ProjectId } from "../tutorial/types";
import PromptCard from "./PromptCard";

interface TutorialDrawerProps {
  step: TutorialStep;
  projectType: ProjectId;
  onComplete: () => void;
  isLastStep: boolean;
  canToggleBeforeAfter?: boolean;
  showingBefore?: boolean;
  onToggleBeforeAfter?: () => void;
}

export default function TutorialDrawer({
  step,
  projectType,
  onComplete,
  isLastStep,
  canToggleBeforeAfter = false,
  showingBefore = false,
  onToggleBeforeAfter,
}: TutorialDrawerProps) {
  const [expanded, setExpanded] = useState(true);

  // Auto-expand when step changes
  useEffect(() => {
    setExpanded(true);
  }, [step.id]);

  const prompts = step.prompts[projectType] || [];

  return (
    <div
      style={{
        ...styles.container,
        height: expanded ? "280px" : "44px",
      }}
    >
      {/* Collapsed bar / header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={styles.header}
      >
        <span style={styles.headerTitle}>
          {step.title}
        </span>
        <span style={styles.expandIcon}>
          {expanded ? "▼" : "▲"}
        </span>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={styles.content}>
          <div style={styles.scrollArea}>
            <p style={styles.description}>{step.description}</p>

            {prompts.length > 0 && (
              <div style={styles.promptsSection}>
                <h4 style={styles.sectionTitle}>
                  Try this in the terminal:
                </h4>
                {prompts.map((prompt, i) => (
                  <PromptCard key={i} prompt={prompt} />
                ))}
              </div>
            )}

            {step.tips.length > 0 && (
              <div style={styles.tipsSection}>
                {step.tips.map((tip, i) => (
                  <div key={i} style={styles.tip}>
                    💡 {tip}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={styles.footer}>
            {canToggleBeforeAfter && onToggleBeforeAfter && (
              <button
                onClick={onToggleBeforeAfter}
                style={{
                  ...styles.beforeAfterBtn,
                  backgroundColor: showingBefore ? "#0e639c" : "#3e3e42",
                }}
              >
                {showingBefore ? "Showing: Before" : "Compare: Before/After"}
              </button>
            )}
            <div style={{ flex: 1 }} />
            <button onClick={onComplete} style={styles.doneButton}>
              {isLastStep ? "🎉 Finish Tutorial" : "✅ Mark as Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flexShrink: 0,
    backgroundColor: "#1e1e1e",
    borderTop: "1px solid #3e3e42",
    display: "flex",
    flexDirection: "column",
    transition: "height 0.25s ease",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "44px",
    minHeight: "44px",
    padding: "0 16px",
    backgroundColor: "#252526",
    border: "none",
    borderBottom: "1px solid #3e3e42",
    cursor: "pointer",
    color: "#d4d4d4",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "13px",
    width: "100%",
    textAlign: "left" as const,
  },
  headerTitle: {
    fontWeight: 500,
  },
  expandIcon: {
    fontSize: "10px",
    color: "#808080",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 0,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "12px 16px",
  },
  description: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#d4d4d4",
    margin: "0 0 12px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  promptsSection: {
    marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#569cd6",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  tipsSection: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  tip: {
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: "1.5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  footer: {
    padding: "8px 16px",
    borderTop: "1px solid #3e3e42",
    display: "flex",
    justifyContent: "flex-end",
  },
  beforeAfterBtn: {
    padding: "6px 12px",
    color: "#d4d4d4",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition: "background-color 0.15s ease",
  },
  doneButton: {
    padding: "6px 16px",
    backgroundColor: "#0e639c",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition: "background-color 0.15s ease",
  },
};
