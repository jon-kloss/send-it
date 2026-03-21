import { describe, it, expect } from "vitest";
import { STEPS, TOTAL_STEPS } from "../tutorial/steps";
import { PROJECTS } from "../tutorial/projects";
import type { ProjectId } from "../tutorial/types";

describe("Tutorial data integrity", () => {
  it("has exactly 12 steps", () => {
    expect(TOTAL_STEPS).toBe(12);
    expect(STEPS.length).toBe(12);
  });

  it("steps have sequential IDs from 1 to 12", () => {
    STEPS.forEach((step, i) => {
      expect(step.id).toBe(i + 1);
    });
  });

  it("every step has prompts for all 3 project types", () => {
    const projectIds: ProjectId[] = ["portfolio", "recipe", "todo"];
    STEPS.forEach((step) => {
      projectIds.forEach((pid) => {
        expect(step.prompts[pid]).toBeDefined();
        expect(step.prompts[pid].length).toBeGreaterThan(0);
      });
    });
  });

  it("every step has at least one tip", () => {
    STEPS.forEach((step) => {
      expect(step.tips.length).toBeGreaterThan(0);
    });
  });

  it("has 3 project types", () => {
    expect(PROJECTS.length).toBe(3);
    expect(PROJECTS.map((p) => p.id)).toEqual(["portfolio", "recipe", "todo"]);
  });

  it("milestone steps have achievements", () => {
    const milestoneSteps = [1, 2, 3, 6, 8, 10, 12];
    milestoneSteps.forEach((stepId) => {
      const step = STEPS.find((s) => s.id === stepId);
      expect(step?.achievement).toBeDefined();
      expect(step?.achievement?.emoji).toBeTruthy();
      expect(step?.achievement?.title).toBeTruthy();
    });
  });

  it("before/after steps are marked correctly", () => {
    const beforeAfterSteps = STEPS.filter((s) => s.hasBeforeAfter);
    expect(beforeAfterSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("no step uses technical jargon in description", () => {
    const jargonTerms = [
      "DOM",
      "API",
      "middleware",
      "transpile",
      "webpack",
      "npm install",
      "git commit",
    ];
    STEPS.forEach((step) => {
      jargonTerms.forEach((term) => {
        expect(step.description.toLowerCase()).not.toContain(term.toLowerCase());
      });
    });
  });
});
