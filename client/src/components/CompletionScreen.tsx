import { useEffect } from "react";
import confetti from "canvas-confetti";

interface CompletionScreenProps {
  achievementCount: number;
  totalAchievements: number;
  glossaryCount: number;
  onKeepBuilding: () => void;
  onStartOver: () => void;
}

export default function CompletionScreen({
  achievementCount,
  totalAchievements,
  glossaryCount,
  onKeepBuilding,
  onStartOver,
}: CompletionScreenProps) {
  // Big confetti celebration on mount
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#569cd6", "#d7ba7d", "#6a9955", "#c586c0", "#4ec9b0"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#569cd6", "#d7ba7d", "#6a9955", "#c586c0", "#4ec9b0"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.emoji}>🎉</div>
        <h1 style={styles.title}>You did it!</h1>
        <p style={styles.subtitle}>
          You just built a real website by having a conversation with AI.
          No coding required — just your imagination!
        </p>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <span style={styles.statValue}>12</span>
            <span style={styles.statLabel}>Steps completed</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>
              {achievementCount}/{totalAchievements}
            </span>
            <span style={styles.statLabel}>Achievements earned</span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statValue}>{glossaryCount}</span>
            <span style={styles.statLabel}>Terms discovered</span>
          </div>
        </div>

        <p style={styles.keepGoing}>
          Your website is saved on this computer. You can keep talking to Claude
          to add more features, or start fresh with a completely new project!
        </p>

        <div style={styles.buttons}>
          <button onClick={onKeepBuilding} style={styles.primaryButton}>
            Keep building with Claude
          </button>
          <button onClick={onStartOver} style={styles.secondaryButton}>
            Start a new project
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
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 6000,
    padding: "20px",
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    textAlign: "center" as const,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  emoji: {
    fontSize: "64px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 12px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#9ca3af",
    lineHeight: "1.6",
    margin: "0 0 32px",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    marginBottom: "32px",
  },
  stat: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "4px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#d7ba7d",
  },
  statLabel: {
    fontSize: "12px",
    color: "#808080",
  },
  keepGoing: {
    fontSize: "14px",
    color: "#d4d4d4",
    lineHeight: "1.6",
    margin: "0 0 24px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#0e639c",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  secondaryButton: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "#808080",
    border: "1px solid #3e3e42",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
