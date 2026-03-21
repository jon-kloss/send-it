import { PROJECTS } from "../tutorial/projects";
import type { ProjectId } from "../tutorial/types";

interface ProjectPickerProps {
  onSelect: (projectId: ProjectId) => void;
}

export default function ProjectPicker({ onSelect }: ProjectPickerProps) {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome!</h1>
          <p style={styles.subtitle}>
            You're about to build a real website using AI. No coding experience
            needed — just pick a project and start talking to Claude!
          </p>
        </div>

        <h2 style={styles.question}>What would you like to build?</h2>

        <div style={styles.cards}>
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => onSelect(project.id)}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#569cd6";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#3e3e42";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={styles.emoji}>{project.emoji}</span>
              <h3 style={styles.cardTitle}>{project.name}</h3>
              <p style={styles.cardDescription}>{project.description}</p>
            </button>
          ))}
        </div>

        <p style={styles.footer}>
          Don't worry about choosing the "right" one — they're all fun!
        </p>
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
    zIndex: 1000,
    padding: "20px",
  },
  container: {
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 12px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  subtitle: {
    fontSize: "16px",
    color: "#9ca3af",
    lineHeight: "1.6",
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  question: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#d4d4d4",
    margin: "0 0 20px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  cards: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  card: {
    flex: 1,
    background: "#1e1e1e",
    border: "2px solid #3e3e42",
    borderRadius: "12px",
    padding: "24px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center" as const,
    color: "#d4d4d4",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "14px",
  },
  emoji: {
    fontSize: "40px",
    display: "block",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#ffffff",
    margin: "0 0 8px",
  },
  cardDescription: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.5",
    margin: 0,
  },
  footer: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
};
