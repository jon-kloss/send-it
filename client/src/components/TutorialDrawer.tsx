import { useState, useEffect } from "react";
import { getPrompts, type TutorialStep, type ProjectId, type PromptExample } from "../tutorial/types";
import PromptCard from "./PromptCard";

interface TutorialDrawerProps {
  step: TutorialStep;
  projectType: ProjectId;
  userName: string;
  onComplete: () => void;
  isLastStep: boolean;
  tutorialComplete?: boolean;
  smartSuggestion?: PromptExample | null;
  onPromptCopied?: () => void;
}

export default function TutorialDrawer({
  step,
  projectType,
  userName,
  onComplete,
  isLastStep,
  tutorialComplete = false,
  smartSuggestion,
  onPromptCopied,
}: TutorialDrawerProps) {
  const [expanded, setExpanded] = useState(true);

  // Auto-expand when step changes
  useEffect(() => {
    setExpanded(true);
  }, [step.id]);

  const prompts = getPrompts(step, projectType, userName);

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

            {tutorialComplete ? (
              <>
                <div style={styles.completeCard}>
                  🎉 Tutorial complete! You can keep chatting with Claude to build more, or click the button to see your stats!
                </div>
                <button onClick={onComplete} style={styles.finishButton}>
                  🎉 Finish Tutorial
                </button>
              </>
            ) : (
              <>
                {prompts.length > 0 && (
                  <div style={styles.promptsSection}>
                    <h4 style={styles.sectionTitle}>
                      {step.id === 1
                        ? "Type this in the terminal:"
                        : "Here's an idea, or try your own:"}
                    </h4>
                    {prompts.map((prompt, i) => (
                      <PromptCard key={i} prompt={prompt} onCopy={onPromptCopied} />
                    ))}
                    {step.id !== 1 && (
                      <p style={styles.ownIdea}>
                        These are just suggestions — feel free to ask Claude for anything you want!
                      </p>
                    )}
                  </div>
                )}

                {smartSuggestion && step.id > 1 && (
                  <div style={styles.smartSection}>
                    <h4 style={styles.smartTitle}>
                      Based on your site, you could also try:
                    </h4>
                    <PromptCard prompt={smartSuggestion} />
                  </div>
                )}
              </>
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
            <div style={{ flex: 1 }} />
            <button onClick={onComplete} style={styles.skipButton}>
              {isLastStep ? "🎉 Finish Tutorial" : "Skip →"}
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
  smartSection: {
    marginBottom: "12px",
    padding: "10px 12px",
    backgroundColor: "#1a2a1a",
    border: "1px solid #2d4a2d",
    borderRadius: "8px",
  },
  smartTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6a9955",
    margin: "0 0 8px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  finishButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#0e639c",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    marginBottom: "12px",
  },
  completeCard: {
    background: "#2d2d30",
    border: "1px solid #3e3e42",
    borderRadius: "8px",
    padding: "14px 16px",
    fontSize: "13px",
    color: "#808080",
    lineHeight: "1.6",
    textAlign: "center" as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    marginBottom: "12px",
  },
  ownIdea: {
    fontSize: "12px",
    color: "#6a9955",
    fontStyle: "italic" as const,
    margin: "4px 0 0",
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
  skipButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    color: "#808080",
    border: "1px solid #3e3e42",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    transition: "color 0.15s ease",
  },
};
