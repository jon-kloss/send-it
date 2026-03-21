import { TOTAL_STEPS } from "../tutorial/steps";

interface TutorialBarProps {
  currentStep: number;
  stepTitle: string;
  completedCount: number;
  achievementCount: number;
}

export default function TutorialBar({
  currentStep,
  stepTitle,
  completedCount,
  achievementCount,
}: TutorialBarProps) {
  const progressPercent = (completedCount / TOTAL_STEPS) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.bar}>
        <span style={styles.stepIndicator}>
          Step {currentStep} of {TOTAL_STEPS}
        </span>
        <span style={styles.title}>{stepTitle}</span>
        <span style={styles.badges}>
          {achievementCount > 0 && (
            <span style={styles.badge} title="Achievements earned">
              🏆 {achievementCount}
            </span>
          )}
        </span>
      </div>
      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progressPercent}%`,
          }}
        />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flexShrink: 0,
  },
  bar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "42px",
    padding: "0 16px",
    backgroundColor: "#252526",
    borderBottom: "1px solid #3e3e42",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "13px",
  },
  stepIndicator: {
    color: "#569cd6",
    fontWeight: 600,
    minWidth: "100px",
  },
  title: {
    color: "#d4d4d4",
    fontWeight: 500,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
    flex: 1,
    textAlign: "center" as const,
    padding: "0 16px",
  },
  badges: {
    display: "flex",
    gap: "8px",
    minWidth: "80px",
    justifyContent: "flex-end",
  },
  badge: {
    fontSize: "12px",
    color: "#d7ba7d",
  },
  progressTrack: {
    height: "3px",
    backgroundColor: "#3e3e42",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#569cd6",
    transition: "width 0.4s ease",
    borderRadius: "0 2px 2px 0",
  },
};
