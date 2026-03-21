import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Terminal from "./components/Terminal";
import Preview from "./components/Preview";
import { useSocket } from "./hooks/useSocket";
import { useFiles } from "./hooks/useFiles";

export default function App() {
  const { send, connected, addMessageHandler } = useSocket();
  const files = useFiles(addMessageHandler, connected);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#1e1e1e",
      }}
    >
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
  );
}
