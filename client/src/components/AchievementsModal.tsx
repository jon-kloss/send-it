import { STEPS } from "../tutorial/steps";
import type { Achievement } from "../tutorial/types";

interface AchievementsModalProps {
  earnedIds: string[];
  onClose: () => void;
}

// Collect all achievements from steps with their step context
const ALL_ACHIEVEMENTS: Array<{ achievement: Achievement; stepTitle: string }> =
  STEPS.filter((s) => s.achievement).map((s) => ({
    achievement: s.achievement!,
    stepTitle: s.title,
  }));

export default function AchievementsModal({
  earnedIds,
  onClose,
}: AchievementsModalProps) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>🏆 Achievements</h2>
            <p style={styles.subtitle}>
              {earnedIds.length} of {ALL_ACHIEVEMENTS.length} earned — keep
              building to unlock them all!
            </p>
          </div>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={styles.list}>
          {ALL_ACHIEVEMENTS.map(({ achievement, stepTitle }) => {
            const earned = earnedIds.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                style={{
                  ...styles.entry,
                  opacity: earned ? 1 : 0.4,
                }}
              >
                <span style={styles.emoji}>
                  {earned ? achievement.emoji : "🔒"}
                </span>
                <div>
                  <div style={styles.achievementTitle}>
                    {earned ? achievement.title : "???"}
                  </div>
                  <div style={styles.stepName}>
                    {earned
                      ? `Earned during: ${stepTitle}`
                      : "Keep going to unlock!"}
                  </div>
                </div>
              </div>
            );
          })}
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
    maxWidth: "420px",
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
  list: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "12px 20px 20px",
  },
  entry: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "12px 0",
    borderBottom: "1px solid #2d2d30",
  },
  emoji: {
    fontSize: "28px",
    flexShrink: 0,
  },
  achievementTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#d7ba7d",
    marginBottom: "2px",
  },
  stepName: {
    fontSize: "12px",
    color: "#808080",
  },
};
