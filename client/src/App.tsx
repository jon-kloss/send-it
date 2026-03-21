import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Terminal from "./components/Terminal";
import Preview from "./components/Preview";
import ProjectPicker from "./components/ProjectPicker";
import TutorialBar from "./components/TutorialBar";
import TutorialDrawer from "./components/TutorialDrawer";
import { useSocket } from "./hooks/useSocket";
import { useFiles } from "./hooks/useFiles";
import { useTutorialState } from "./hooks/useTutorialState";
import { STEPS, TOTAL_STEPS } from "./tutorial/steps";

export default function App() {
  const { send, connected, addMessageHandler } = useSocket();
  const files = useFiles(addMessageHandler, connected);
  const tutorial = useTutorialState();

  const currentStepData = STEPS[tutorial.currentStep - 1];

  // Handle step completion + achievement unlock
  const handleStepComplete = () => {
    if (currentStepData?.achievement) {
      tutorial.unlockAchievement(currentStepData.achievement.id);
    }
    tutorial.markStepComplete();
  };

  // Show project picker if no project selected
  if (!tutorial.projectType) {
    return <ProjectPicker onSelect={tutorial.setProjectType} />;
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
            <Preview files={files} />
          </Allotment.Pane>
        </Allotment>
      </div>

      {currentStepData && (
        <TutorialDrawer
          step={currentStepData}
          projectType={tutorial.projectType}
          onComplete={handleStepComplete}
          isLastStep={tutorial.currentStep === TOTAL_STEPS}
        />
      )}
    </div>
  );
}
