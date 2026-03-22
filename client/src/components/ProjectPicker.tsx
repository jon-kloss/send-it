import { useState } from "react";
import { PROJECTS } from "../tutorial/projects";
import type { ProjectId } from "../tutorial/types";

interface ProjectPickerProps {
  onSelect: (projectId: ProjectId, userName: string) => void;
  existingName?: string;
}

export default function ProjectPicker({ onSelect, existingName }: ProjectPickerProps) {
  const [name, setName] = useState(existingName || "");

  const hasName = name.trim().length > 0;

  const handleSelect = (projectId: ProjectId) => {
    if (!hasName) return;
    onSelect(projectId, name.trim());
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>SEND IT</h1>
          <p style={styles.tagline}>Speak English, No Degree: Interactive Tutorial</p>
          <p style={styles.subtitle}>
            Learn how to use Claude Code by building something fun — no
            experience needed. Just type what you want, and watch Claude do the rest!
          </p>
        </div>

        <div style={styles.nameSection}>
          <label style={styles.nameLabel}>First, what's your name?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={styles.nameInput}
            autoFocus
          />
        </div>

        <h2 style={styles.question}>What would you like to build?</h2>

        <div style={styles.cards}>
          {PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              style={{
                ...styles.card,
                opacity: hasName ? 1 : 0.35,
                cursor: hasName ? "pointer" : "default",
              }}
              onMouseEnter={(e) => {
                if (!hasName) return;
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
    marginBottom: "24px",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 12px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  tagline: {
    fontSize: "13px",
    color: "#569cd6",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    fontWeight: 600,
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
  nameSection: {
    marginBottom: "28px",
  },
  nameLabel: {
    display: "block",
    fontSize: "15px",
    fontWeight: 600,
    color: "#d4d4d4",
    marginBottom: "8px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  nameInput: {
    width: "280px",
    padding: "10px 16px",
    backgroundColor: "#2d2d30",
    border: "2px solid #3e3e42",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "16px",
    textAlign: "center" as const,
    outline: "none",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    boxSizing: "border-box" as const,
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
