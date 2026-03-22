export interface GlossaryEntry {
  term: string;
  definition: string;
  // Patterns to detect in terminal output
  detectPatterns: RegExp[];
  // Optional special popup shown the first time this term is discovered
  firstTimePopup?: {
    emoji: string;
    title: string;
    paragraphs: string[];
  };
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "Terminal",
    definition:
      "The dark window where you type messages to Claude. Think of it like a text chat with your computer. You type something, press Enter, and it responds.",
    detectPatterns: [],
  },
  {
    term: "Skill",
    definition:
      "A special ability that makes Claude even better at specific tasks. For example, a design skill helps Claude create beautiful websites. Claude picks the right skill automatically — you don't have to do anything!",
    detectPatterns: [
      /Launching\s*skill/i,
      /Launchingskill/i,
      /Using.*skill/i,
      /skill.*activated/i,
      /frontend-design/i,
      /game-developer/i,
      /claude-api/i,
      /skill:/i,
    ],
    firstTimePopup: {
      emoji: "🧩",
      title: "Claude just activated a Skill!",
      paragraphs: [
        "You might notice Claude saying it's using a \"skill.\" Think of skills like superpowers — they're special abilities that make Claude even better at specific things.",
        "For example, when you ask Claude to build a website, it might activate a design skill that helps it create really beautiful-looking pages instead of plain ones.",
        "You don't need to do anything — Claude picks the right skill automatically based on what you're asking for. It's like having a team of specialists that Claude can call on whenever it needs help with something specific!",
      ],
    },
  },
  {
    term: "File",
    definition:
      "A document that stores part of your website. Your website is made up of several files working together — like pages in a book. Claude creates and edits these files for you.",
    detectPatterns: [/Wrote \d+ lines to/i, /Created? .+\.\w+/i],
  },
  {
    term: "Preview",
    definition:
      "The panel on the right side of your screen that shows what your website actually looks like. It updates automatically whenever Claude makes changes.",
    detectPatterns: [],
  },
  {
    term: "Prompt",
    definition:
      "The message you type to Claude asking it to do something. The better you describe what you want, the better the result! For example: 'Make my website blue' is a prompt.",
    detectPatterns: [],
  },
  {
    term: "Dark Mode",
    definition:
      "A color scheme that uses dark backgrounds with light text. It's easier on your eyes in low light. Many websites and apps offer a toggle to switch between light and dark modes.",
    detectPatterns: [/dark.?mode/i, /light.?mode/i, /theme.*toggle/i],
  },
  {
    term: "Responsive",
    definition:
      "A website that looks good on any screen size — whether it's a big computer monitor, a tablet, or a phone. The layout automatically adjusts to fit.",
    detectPatterns: [/responsive/i, /mobile/i, /@media/i],
  },
  {
    term: "Favicon",
    definition:
      "The tiny icon that appears next to your website's name in the browser tab. It's a small detail that makes your site look more polished and professional.",
    detectPatterns: [/favicon/i],
  },
  {
    term: "Navigation / Nav Bar",
    definition:
      "The menu at the top (or side) of a website with links to different sections. It helps visitors find their way around, like a table of contents in a book.",
    detectPatterns: [/nav.*bar/i, /navigation/i, /<nav/i],
  },
  {
    term: "Animation",
    definition:
      "Movement or visual effects on a website — like things fading in, sliding, or bouncing. Animations make a website feel more alive and polished.",
    detectPatterns: [/animation/i, /transition/i, /fade.?in/i, /keyframes/i],
  },
  {
    term: "Gradient",
    definition:
      "A smooth blend between two or more colors. Instead of a plain solid color background, a gradient smoothly transitions from one color to another, giving a more modern look.",
    detectPatterns: [/gradient/i],
  },
  {
    term: "Deploy",
    definition:
      "Putting your website on the internet so anyone in the world can visit it. Right now your website only lives on your computer, but deploying it makes it public!",
    detectPatterns: [/deploy/i, /hosting/i, /publish/i],
  },
  {
    term: "MCP",
    definition:
      "Model Context Protocol — a way for Claude to connect to external tools and services. Think of it like giving Claude access to extra superpowers beyond just writing code.",
    detectPatterns: [/\bMCP\b/, /Model Context Protocol/i],
  },
  {
    term: "Git",
    definition:
      "A tool that saves snapshots of your work, like a super-powered undo button. Developers use it to track changes and go back to earlier versions if something breaks.",
    detectPatterns: [/\bgit\b/i, /commit/i, /repository/i],
  },
  {
    term: "Self-Correction",
    definition:
      "Sometimes Claude makes a small mistake — and then catches it and fixes it on its own! This is one of Claude's coolest abilities. Just like a person who says 'Oops, let me fix that,' Claude can notice when something isn't right and automatically correct it without you having to ask.",
    detectPatterns: [
      /let\s*me\s*fix/i,
      /letmefix/i,
      /I\s*made\s*a[n]?\s*(?:error|mistake)/i,
      /let\s*me\s*correct/i,
      /that\s*was\s*incorrect/i,
      /apologi[zs]e/i,
      /I\s*need\s*to\s*fix/i,
      /going\s*back\s*to\s*fix/i,
      /actually,?\s*(?:let\s*me|I\s*should)/i,
      /oops/i,
      /my\s*mistake/i,
      /mymistake/i,
      /let\s*me\s*try\s*(?:again|that\s*again)/i,
      /I\s*got\s*that\s*wrong/i,
    ],
    firstTimePopup: {
      emoji: "🔧",
      title: "Claude just fixed its own mistake!",
      paragraphs: [
        "Did you notice that? Claude made a small mistake and then caught it and fixed it — all on its own!",
        "This is one of the coolest things about Claude. Just like a person who says \"Oops, let me fix that,\" Claude can notice when something isn't quite right and automatically correct it without you having to point it out.",
        "You don't need to worry when you see this happen — it means Claude is double-checking its own work to make sure everything turns out right. It's like having a builder who inspects their own work as they go!",
      ],
    },
  },
  {
    term: "Permission Prompt",
    definition:
      "Before Claude creates or changes a file on your computer, it asks for your permission first. This is a safety feature — Claude won't do anything without your OK. Just press 1 or Enter to say yes! You can also press 2 to let Claude make all the changes it needs without asking each time.",
    detectPatterns: [
      /allow\s*all\s*edits/i,
      /Do\s*you\s*want\s*to\s*create/i,
      /Do\s*you\s*want\s*to\s*edit/i,
      /Do\s*you\s*want\s*to\s*write/i,
      /Do\s*you\s*want\s*to\s*delete/i,
      /Do\s*you\s*want\s*to\s*run/i,
      /Doyouwantto/i,
      /allowalledits/i,
    ],
    firstTimePopup: {
      emoji: "🛡️",
      title: "Claude is asking for permission!",
      paragraphs: [
        "Claude is being polite! Before it creates or changes any files on your computer, it asks you first. This is a safety feature to make sure you're OK with what it's doing.",
        "You'll see options like \"Yes\" and \"Yes, allow all edits during this session.\" For this tutorial, either option works great! Press 1 or Enter to approve one change at a time, or press 2 to let Claude work freely without asking each time.",
        "This is like a contractor asking \"Can I start painting this wall?\" before they begin — Claude wants to make sure you're on board before making changes!",
      ],
    },
  },
  {
    term: "Tokens",
    definition:
      "Tokens are how Claude measures the size of a conversation. Think of them like words — but not exactly. A token is roughly 3/4 of a word. When you send Claude a message and it responds, both your message and its response use tokens. Claude has a limit on how many tokens it can handle at once, kind of like how many pages it can read and write in one sitting.",
    detectPatterns: [/token/i, /context.*window/i, /token.*usage/i],
  },
];

// Pre-built terms that are always in the glossary from the start
export const DEFAULT_DISCOVERED_TERMS = ["Terminal", "Preview", "Prompt"];
