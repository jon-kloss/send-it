import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Terminal from "./components/Terminal";
import Preview from "./components/Preview";

export default function App() {
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
          <Terminal />
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
