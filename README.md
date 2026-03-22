# SEND IT — Speak English, No Degree: Interactive Tutorial

An interactive tutorial that teaches someone with zero coding experience how to build a website using Claude Code. The app provides a split-screen experience with a real terminal on the left and a live preview on the right, so the user can watch their website take shape in real-time as they chat with Claude.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Prerequisites

- **Node.js** 20+
- **Claude Code** installed and authenticated (`brew install claude-code` or `npm install -g @anthropic-ai/claude-code`)
- An active Claude API key or Claude Max subscription

### First Run Note

If the terminal fails to connect on first run, you may need to make the PTY helper executable:

```bash
chmod +x node_modules/node-pty/prebuilds/darwin-arm64/spawn-helper
```

## What It Does

The user enters their name, picks a project type (personal portfolio, recipe collection, or to-do app), and follows a 12-step guided tutorial. Each step suggests a plain-English prompt to send to Claude Code. As Claude writes files, the Sandpack preview panel updates in real-time.

### Features

- **Real terminal** — xterm.js connected to an actual shell via node-pty + WebSocket. Claude Code runs for real.
- **Live preview** — Sandpack hot-reloads as Claude creates/edits files in `~/htcgf-workspace/`.
- **12-step tutorial** — Beginner-friendly steps that teach prompting, undo, error fixing, and Claude's memory. Project-specific prompts for all 3 project types.
- **Auto-advancing steps** — Steps complete automatically when Claude finishes making changes.
- **Smart suggestions** — When the user goes off-script, analyzes their files and suggests a contextual next step.
- **Achievement system** — 7 achievements with confetti celebrations at milestone steps. Click the trophy badge to see earned/locked achievements.
- **Glossary** — Auto-discovers terms like "Skill", "Self-Correction", "Error Message", "Permission Prompt" from terminal output. Shows educational popups the first time a term is encountered. Searchable modal with 21 terms.
- **Customizable name** — Entered on the welcome screen, preserved across resets, and interpolated into prompts.
- **Before/after comparisons** — Floating toggle on the preview pane to compare before and after key steps.
- **Progress persistence** — Tutorial state, achievements, and glossary saved to localStorage.
- **Full reset** — Clears tutorial progress, kills the terminal session, wipes workspace files, and preserves the user's name.

### Tutorial Steps

| Step | Title | What it teaches |
|------|-------|-----------------|
| 1 | Say hello to Claude | Starting Claude Code |
| 2 | Create your first page | Basic prompting, permission prompts |
| 3 | Make it look nice | Styling, Claude skills |
| 4 | Try something wild | Make it ugly on purpose (neon colors) |
| 5 | Undo! Go back! | The "undo" safety net |
| 6 | Add your first content | Incremental building |
| 7 | Add more content | Growing the site |
| 8 | Add a menu bar | Navigation, multi-file editing |
| 9 | Make it do something | Interactivity, extended thinking |
| 10 | Break it on purpose | Intentionally cause a JS error |
| 11 | Copy the error to Claude! | Paste errors to Claude for fixing |
| 12 | Remember this? | Claude's conversational memory |

### Achievements

| Emoji | Title | Earned at |
|-------|-------|-----------|
| 👋 | First Contact | Step 1 — Starting Claude |
| 🎨 | Creator | Step 2 — First website |
| ✨ | Designer | Step 3 — Styling |
| ⏪ | Time Traveler | Step 5 — Undo |
| ⚡ | Programmer | Step 9 — Interactivity |
| 🐛 | Bug Squasher | Step 11 — Fixing errors |
| 🚀 | Shipped! | Step 12 — Finale |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Browser (localhost:5173)                            │
│                                                     │
│  ┌─ Tutorial Bar ─────────────────────────────────┐ │
│  │ Step 3 of 12  ████░░░░  📖 5  🏆 2  ↺ Reset  │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  Terminal         │  │  Live Preview            │ │
│  │  (xterm.js)       │  │  (Sandpack)              │ │
│  │                   │  │                          │ │
│  │  Real Claude Code │  │  Auto-updating preview   │ │
│  │  running here     │  │  of the website          │ │
│  └──────────────────┘  └──────────────────────────┘ │
│                                                     │
│  ┌─ Tutorial Drawer ─────────────────────────────┐  │
│  │ Step instructions, copyable prompts, tips     │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────┘
                          │ WebSocket
                   ┌──────┴──────┐
                   │  Node.js    │
                   │  Backend    │
                   │  (Express)  │
                   │             │
                   │  node-pty   │
                   │  chokidar   │
                   └─────────────┘
```

### Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | React + Vite + TypeScript | UI framework |
| Terminal | xterm.js + WebSocket | Browser terminal emulator |
| Preview | Sandpack (CodeSandbox) | Live HTML/CSS/JS preview |
| Split Panes | Allotment | Resizable panel layout |
| Backend | Express + TypeScript | HTTP + WebSocket server |
| PTY | node-pty | Spawns real shell processes |
| File Watching | chokidar | Detects file changes for live preview |
| Confetti | canvas-confetti | Achievement celebrations |
| Tests | Vitest | Unit tests |

### Project Structure

```
client/src/
  App.tsx                    — Main layout, wires everything together
  components/
    Terminal.tsx              — xterm.js terminal with WebSocket
    Preview.tsx               — Sandpack live preview panel
    ProjectPicker.tsx         — Welcome screen with name input + project selection
    TutorialBar.tsx           — Top bar with progress, glossary, achievements, reset
    TutorialDrawer.tsx        — Bottom drawer with step instructions + prompts
    PromptCard.tsx            — Clickable copy-to-clipboard prompt cards
    AchievementToast.tsx      — Confetti toast for milestone achievements
    AchievementsModal.tsx     — Modal showing all earned/locked achievements
    GlossaryModal.tsx         — Searchable glossary of discovered terms
    GlossaryToast.tsx         — Toast for newly discovered glossary terms
    DiscoveryPopup.tsx        — First-time educational popup (skills, errors, etc.)
    CompletionScreen.tsx      — Final celebration screen with stats
  hooks/
    useSocket.ts              — Shared WebSocket connection
    useFiles.ts               — File sync from server to Sandpack
    useTutorialState.ts       — Tutorial progress with localStorage
    useAutoComplete.ts        — Auto-detect step completion from file changes
    useClaudeBusy.ts          — Track when Claude is actively outputting
    useBeforeAfter.ts         — File snapshots for before/after comparisons
    useGlossary.ts            — Term discovery from terminal output
    useSmartSuggestion.ts     — Contextual suggestions when user goes off-script
  tutorial/
    types.ts                  — TypeScript interfaces
    steps.ts                  — 12 tutorial steps with prompts per project type
    projects.ts               — 3 project type definitions
    glossary.ts               — 21 glossary terms with detection patterns

server/src/
  index.ts                    — Express server, WebSocket, file API, reset endpoint
  pty.ts                      — PTY session management (node-pty)
  fileWatcher.ts              — chokidar file watcher with debounce
```

### Data Flow

```
User types prompt → Claude Code writes files → chokidar detects changes →
server reads file content → WebSocket broadcast → Sandpack hot-reloads preview
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm test` | Run all tests (client + server) |
| `npm run build` | Build both workspaces |

## Workspace

Claude Code operates in `~/htcgf-workspace/`. This directory:
- Is created automatically on first run
- Contains a `CLAUDE.md` that instructs Claude to reference the live preview instead of suggesting browser opens
- Is cleared on reset (except `CLAUDE.md`)
- Files are watched by chokidar and synced to Sandpack in real-time
