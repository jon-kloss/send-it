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
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 2rem;
    }
    .container {
      max-width: 500px;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    .emoji {
      font-size: 4rem;
      margin-bottom: 1rem;
      display: block;
    }
  </style>
</head>
<body>
  <div class="container">
    <span class="emoji">🚀</span>
    <h1>Your website will appear here</h1>
    <p>Use the terminal on the left to start building with Claude Code. As you create files, this preview will update in real-time!</p>
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
      <SandpackProvider
        template="static"
        files={activeFiles}
        options={{
          recompileMode: "immediate",
        }}
      >
        <SandpackLayout
          style={{
            height: "100%",
            borderRadius: 0,
            border: "none",
          }}
        >
          <SandpackPreview
            style={{ height: "100%" }}
            showOpenInCodeSandbox={false}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
