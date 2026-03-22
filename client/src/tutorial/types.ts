export interface PromptExample {
  text: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
}

export interface StepCompletionCheck {
  // Check terminal output for a pattern (e.g., Claude Code banner)
  terminalPattern?: RegExp;
  // Check if specific file extensions exist in workspace
  hasFileWithExtension?: string[];
  // Check if any file content matches a pattern
  fileContentPattern?: RegExp;
  // Check if files changed since entering the step (any edit counts)
  anyFileChange?: boolean;
}

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  prompts: Record<ProjectId, PromptExample[] | ((userName: string) => PromptExample[])>;
  tips: string[];
  achievement?: Achievement;
  hasBeforeAfter?: boolean;
  completionCheck?: StepCompletionCheck;
}

export function getPrompts(step: TutorialStep, projectId: ProjectId, userName: string): PromptExample[] {
  const prompts = step.prompts[projectId];
  if (typeof prompts === "function") {
    return prompts(userName);
  }
  return prompts;
}

export type ProjectId = "portfolio" | "recipe" | "todo";

export interface ProjectType {
  id: ProjectId;
  name: string;
  description: string;
  emoji: string;
}

export interface TutorialState {
  projectType: ProjectId | null;
  userName: string;
  currentStep: number;
  completedSteps: number[];
  achievements: string[];
}
