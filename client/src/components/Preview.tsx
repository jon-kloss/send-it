import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";

const PLACEHOLDER_FILES = {
  "/index.html": `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { height: 100%; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { font-size: 0.95rem; opacity: 0.9; line-height: 1.5; }
  </style>
</head>
<body>
  <div>
    <h1>Your website will appear here</h1>
    <p>Use the terminal on the left to start building with Claude Code.</p>
  </div>
</body>
</html>`,
};

interface PreviewProps {
  files?: Record<string, string>;
}

export default function Preview({ files }: PreviewProps) {
  const activeFiles = files && Object.keys(files).length > 0 ? files : PLACEHOLDER_FILES;

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <style>{`
        .sp-wrapper, .sp-layout, .sp-preview, .sp-preview-container,
        .sp-preview iframe {
          height: 100% !important;
        }
        .sp-layout {
          border: none !important;
          border-radius: 0 !important;
        }
        .sp-preview-container {
          overflow: hidden !important;
        }
      `}</style>
      <SandpackProvider
        template="static"
        files={activeFiles}
        options={{
          recompileMode: "immediate",
        }}
      >
        <SandpackLayout>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
