export interface PromptExample {
  text: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  emoji: string;
}

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  prompts: Record<ProjectId, PromptExample[]>;
  tips: string[];
  achievement?: Achievement;
  hasBeforeAfter?: boolean;
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
  currentStep: number;
  completedSteps: number[];
  achievements: string[];
}
