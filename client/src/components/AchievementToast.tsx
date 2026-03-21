import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import type { Achievement } from "../tutorial/types";

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export default function AchievementToast({
  achievement,
  onDismiss,
}: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!achievement) return;

    // Show toast
    setVisible(true);
    setFading(false);

    // Fire confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#569cd6", "#d7ba7d", "#6a9955", "#c586c0", "#4ec9b0"],
    });

    // Start fade after 3s
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    // Dismiss after 4s
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [achievement, onDismiss]);

  if (!visible || !achievement) return null;

  return (
    <div
      style={{
        ...styles.toast,
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(-10px)" : "translateY(0)",
      }}
    >
      <span style={styles.emoji}>{achievement.emoji}</span>
      <div>
        <div style={styles.label}>Achievement Unlocked!</div>
        <div style={styles.title}>{achievement.title}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toast: {
    position: "fixed",
    top: "60px",
    right: "20px",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    backgroundColor: "#2d2d30",
    border: "1px solid #569cd6",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  emoji: {
    fontSize: "32px",
  },
  label: {
    fontSize: "11px",
    color: "#569cd6",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: "2px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#ffffff",
  },
};
