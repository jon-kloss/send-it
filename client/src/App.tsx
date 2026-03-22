import { useState, useCallback } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Terminal from "./components/Terminal";
import Preview from "./components/Preview";
import ProjectPicker from "./components/ProjectPicker";
import TutorialBar from "./components/TutorialBar";
import TutorialDrawer from "./components/TutorialDrawer";
import AchievementToast from "./components/AchievementToast";
import GlossaryModal from "./components/GlossaryModal";
import GlossaryToast from "./components/GlossaryToast";
import DiscoveryPopup from "./components/DiscoveryPopup";
import AchievementsModal from "./components/AchievementsModal";
import CompletionScreen from "./components/CompletionScreen";
import { useSocket } from "./hooks/useSocket";
import { useFiles } from "./hooks/useFiles";
import { useTutorialState } from "./hooks/useTutorialState";
import { useBeforeAfter } from "./hooks/useBeforeAfter";
import { useAutoComplete } from "./hooks/useAutoComplete";
import { useClaudeBusy } from "./hooks/useClaudeBusy";
import { useGlossary } from "./hooks/useGlossary";
import { useSmartSuggestion } from "./hooks/useSmartSuggestion";
import { STEPS, TOTAL_STEPS } from "./tutorial/steps";
import type { Achievement } from "./tutorial/types";

export default function App() {
  const { send, connected, addMessageHandler } = useSocket();
  const files = useFiles(addMessageHandler, connected);
  const tutorial = useTutorialState();
  const claudeBusy = useClaudeBusy(addMessageHandler);
  const glossary = useGlossary(addMessageHandler);
  const [pendingAchievement, setPendingAchievement] =
    useState<Achievement | null>(null);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const currentStepData = STEPS[tutorial.currentStep - 1];
  const smartSuggestion = useSmartSuggestion(files, tutorial.currentStep);

  const {
    displayFiles,
    showingBefore,
    canToggle,
    toggleBeforeAfter,
    captureAfter,
  } = useBeforeAfter(
    tutorial.currentStep,
    currentStepData?.hasBeforeAfter ?? false,
    files
  );

  // Handle step completion + achievement unlock
  const handleStepComplete = useCallback(() => {
    // Capture "after" snapshot for before/after
    if (currentStepData?.hasBeforeAfter) {
      captureAfter(files);
    }

    // Show achievement toast if step has one
    if (currentStepData?.achievement) {
      // Only show if not already earned
      if (!tutorial.achievements.includes(currentStepData.achievement.id)) {
        setPendingAchievement(currentStepData.achievement);
      }
      tutorial.unlockAchievement(currentStepData.achievement.id);
    }

    // Show completion screen on last step
    if (tutorial.currentStep === TOTAL_STEPS) {
      setShowCompletion(true);
    }

    tutorial.markStepComplete();
  }, [currentStepData, files, captureAfter, tutorial]);

  // Auto-detect step completion based on terminal output and file changes
  useAutoComplete({
    currentStep: currentStepData,
    files,
    addMessageHandler,
    onStepComplete: handleStepComplete,
    completedSteps: tutorial.completedSteps,
    claudeBusy,
  });

  const dismissAchievement = useCallback(() => {
    setPendingAchievement(null);
  }, []);

  const handleReset = useCallback(async () => {
    tutorial.reset();
    glossary.resetGlossary();
    try {
      await fetch("http://localhost:3001/api/reset", { method: "POST" });
    } catch {
      // server might be unreachable, still reload
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    window.location.reload();
  }, [tutorial, glossary]);

  // Show project picker if no project selected
  if (!tutorial.projectType) {
    return <ProjectPicker onSelect={(projectId, userName) => tutorial.setProjectType(projectId, userName)} />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TutorialBar
        currentStep={tutorial.currentStep}
        stepTitle={currentStepData?.title || ""}
        completedCount={tutorial.completedSteps.length}
        achievementCount={tutorial.achievements.length}
        glossaryCount={glossary.discoveredCount}
        onReset={handleReset}
        onOpenGlossary={glossary.openModal}
        onOpenAchievements={() => setAchievementsOpen(true)}
      />

      <div style={{ flex: 1, minHeight: 0 }}>
        <Allotment defaultSizes={[50, 50]}>
          <Allotment.Pane minSize={300}>
            <Terminal
              send={send}
              connected={connected}
              addMessageHandler={addMessageHandler}
            />
          </Allotment.Pane>
          <Allotment.Pane minSize={300}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Preview files={displayFiles} />
              {canToggle && (
                <button
                  onClick={toggleBeforeAfter}
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 10,
                    padding: "6px 14px",
                    backgroundColor: showingBefore ? "#0e639c" : "#252526",
                    color: showingBefore ? "#ffffff" : "#d4d4d4",
                    border: showingBefore ? "2px solid #0e639c" : "2px solid #569cd6",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {showingBefore ? "◀ Showing Before" : "Compare: Before / After"}
                </button>
              )}
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>

      {currentStepData && (
        <TutorialDrawer
          step={currentStepData}
          projectType={tutorial.projectType}
          userName={tutorial.userName}
          onComplete={handleStepComplete}
          isLastStep={tutorial.currentStep === TOTAL_STEPS}
          smartSuggestion={smartSuggestion}
        />
      )}

      <AchievementToast
        achievement={pendingAchievement}
        onDismiss={dismissAchievement}
      />

      <GlossaryToast
        toasts={glossary.toasts}
        onOpenGlossary={glossary.openModal}
      />

      {glossary.modalOpen && (
        <GlossaryModal
          entries={glossary.discoveredEntries}
          discoveredCount={glossary.discoveredCount}
          totalCount={glossary.totalCount}
          onClose={glossary.closeModal}
        />
      )}

      {glossary.activePopup && (
        <DiscoveryPopup
          popup={glossary.activePopup}
          onDismiss={glossary.dismissPopup}
        />
      )}

      {achievementsOpen && (
        <AchievementsModal
          earnedIds={tutorial.achievements}
          onClose={() => setAchievementsOpen(false)}
        />
      )}

      {showCompletion && (
        <CompletionScreen
          achievementCount={tutorial.achievements.length}
          totalAchievements={7}
          glossaryCount={glossary.discoveredCount}
          onKeepBuilding={() => setShowCompletion(false)}
          onStartOver={handleReset}
        />
      )}
    </div>
  );
}
