import { useState, useCallback, useEffect } from "react";
import type { TutorialState, ProjectId } from "../tutorial/types";
import { TOTAL_STEPS } from "../tutorial/steps";
import { PROJECTS } from "../tutorial/projects";

const STORAGE_KEY = "htcgf-tutorial-state";

const DEFAULT_STATE: TutorialState = {
  projectType: null,
  currentStep: 1,
  completedSteps: [],
  achievements: [],
};

function loadState(): TutorialState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as TutorialState;

    // Validate shape
    if (typeof parsed.currentStep !== "number" || !Array.isArray(parsed.completedSteps)) {
      return DEFAULT_STATE;
    }

    // Validate project type
    if (parsed.projectType && !PROJECTS.some((p) => p.id === parsed.projectType)) {
      return DEFAULT_STATE;
    }

    // Clamp step to valid range
    if (parsed.currentStep > TOTAL_STEPS) {
      parsed.currentStep = TOTAL_STEPS;
    }
    if (parsed.currentStep < 1) {
      parsed.currentStep = 1;
    }

    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

function saveState(state: TutorialState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export function useTutorialState() {
  const [state, setState] = useState<TutorialState>(loadState);

  // Persist on every change
  useEffect(() => {
    saveState(state);
  }, [state]);

  const setProjectType = useCallback((projectType: ProjectId) => {
    setState((prev) => ({ ...prev, projectType, currentStep: 1 }));
  }, []);

  const markStepComplete = useCallback(() => {
    setState((prev) => {
      const step = prev.currentStep;
      const completedSteps = prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step];

      const nextStep = Math.min(step + 1, TOTAL_STEPS);

      return {
        ...prev,
        completedSteps,
        currentStep: nextStep,
      };
    });
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)),
    }));
  }, []);

  const unlockAchievement = useCallback((achievementId: string) => {
    setState((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    ...state,
    setProjectType,
    markStepComplete,
    goToStep,
    unlockAchievement,
    reset,
  };
}
