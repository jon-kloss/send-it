import { useMemo } from "react";
import type { PromptExample } from "../tutorial/types";

interface FileAnalysis {
  hasHtml: boolean;
  hasCss: boolean;
  hasJs: boolean;
  hasNav: boolean;
  hasForm: boolean;
  hasAnimation: boolean;
  hasResponsive: boolean;
  hasDarkMode: boolean;
  hasImages: boolean;
  hasMultipleSections: boolean;
  fileCount: number;
  totalContentLength: number;
  allContent: string;
}

function analyzeFiles(files: Record<string, string>): FileAnalysis {
  const keys = Object.keys(files);
  const allContent = Object.values(files).join("\n").toLowerCase();

  return {
    hasHtml: keys.some((k) => k.endsWith(".html")),
    hasCss: keys.some((k) => k.endsWith(".css")) || allContent.includes("<style"),
    hasJs: keys.some((k) => k.endsWith(".js")) || allContent.includes("<script"),
    hasNav: /nav|navigation|menu|toolbar/i.test(allContent),
    hasForm: /<form|<input.*type=/i.test(allContent),
    hasAnimation: /animation|transition|@keyframes|fade/i.test(allContent),
    hasResponsive: /@media/i.test(allContent),
    hasDarkMode: /dark.?mode|theme.?toggle|prefers-color-scheme/i.test(allContent),
    hasImages: /<img|background-image|url\(/i.test(allContent),
    hasMultipleSections: (allContent.match(/<section|<article|<div class/gi) || []).length > 3,
    fileCount: keys.length,
    totalContentLength: allContent.length,
    allContent,
  };
}

interface Suggestion {
  text: string;
  description: string;
  reason: string;
}

function generateSuggestions(analysis: FileAnalysis): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (!analysis.hasCss && analysis.hasHtml) {
    suggestions.push({
      text: "Make my website look more beautiful. Add colors, nice fonts, spacing, and make it feel modern and polished.",
      description: "Your site could use some visual love",
      reason: "Your site doesn't have any styling yet",
    });
  }

  if (!analysis.hasNav && analysis.hasHtml && analysis.totalContentLength > 500) {
    suggestions.push({
      text: "Add a menu bar at the top of my site so people can easily jump between different sections.",
      description: "Help visitors navigate your site",
      reason: "Your site is growing but doesn't have a menu yet",
    });
  }

  if (!analysis.hasJs && analysis.hasCss) {
    suggestions.push({
      text: "Make something on my site interactive — maybe a button that does something cool when you click it.",
      description: "Make your site respond to clicks",
      reason: "Your site looks great but nothing happens when you click things",
    });
  }

  if (!analysis.hasResponsive && analysis.hasCss) {
    suggestions.push({
      text: "Make my site look good on phones too. Everything should stack nicely on small screens.",
      description: "Make it mobile-friendly",
      reason: "Your site might not look great on a phone yet",
    });
  }

  if (!analysis.hasDarkMode && analysis.hasJs) {
    suggestions.push({
      text: "Add a dark mode toggle so I can switch between light and dark themes.",
      description: "Add a light/dark theme switch",
      reason: "Dark mode is a fun feature to add",
    });
  }

  if (!analysis.hasAnimation && analysis.hasCss) {
    suggestions.push({
      text: "Add some smooth animations — like things fading in when the page loads, or buttons that feel satisfying to click.",
      description: "Add motion and polish",
      reason: "Animations make your site feel alive",
    });
  }

  if (!analysis.hasForm && analysis.hasJs) {
    suggestions.push({
      text: "Add a form where visitors can type their name and a message. Show a nice confirmation when they submit it.",
      description: "Add a contact or feedback form",
      reason: "Forms let visitors interact with your site",
    });
  }

  if (!analysis.hasImages && analysis.hasCss) {
    suggestions.push({
      text: "Add some visual flair — maybe emoji icons, gradient backgrounds, or decorative elements to make it pop.",
      description: "Add visual personality",
      reason: "Some visual touches would make your site stand out",
    });
  }

  if (analysis.hasHtml && analysis.hasCss && analysis.hasJs && analysis.hasResponsive) {
    suggestions.push({
      text: "Surprise me! Add a creative feature you think would be cool on my site — something I wouldn't think to ask for.",
      description: "Let Claude get creative",
      reason: "Your site has the basics — let Claude surprise you!",
    });
  }

  return suggestions;
}

export function useSmartSuggestion(
  files: Record<string, string>,
  currentStepId: number
): PromptExample | null {
  return useMemo(() => {
    // Don't show smart suggestions on step 1 (just starting Claude)
    if (currentStepId <= 1) return null;
    if (Object.keys(files).length === 0) return null;

    const analysis = analyzeFiles(files);
    const suggestions = generateSuggestions(analysis);

    if (suggestions.length === 0) return null;

    // Pick the most relevant suggestion (first one, since they're priority-ordered)
    const pick = suggestions[0];

    return {
      text: pick.text,
      description: `💡 ${pick.reason}`,
    };
  }, [files, currentStepId]);
}
