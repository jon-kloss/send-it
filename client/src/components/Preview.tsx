import { useMemo } from "react";
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

// Script injected at the very top of HTML files to catch JS errors.
// Must be FIRST so it catches errors from any script that follows.
// Stores errors and renders them once DOM is ready.
const ERROR_HANDLER_SCRIPT = `<script>
(function(){
  var errors = [];
  window.onerror = function(msg) {
    errors.push(msg);
    showErrors();
    return false;
  };
  function showErrors() {
    if (!document.body) {
      // DOM not ready yet — retry shortly
      setTimeout(showErrors, 50);
      return;
    }
    // Remove previous error banner if any
    var old = document.getElementById('__sendit_error');
    if (old) old.remove();
    if (errors.length === 0) return;
    var d = document.createElement('div');
    d.id = '__sendit_error';
    d.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:16px 20px;background:#dc2626;color:white;font-family:-apple-system,BlinkMacSystemFont,monospace;font-size:14px;z-index:99999;cursor:pointer;line-height:1.6;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
    var allMsgs = errors.join('\\n');
    d.innerHTML = '<div style="font-weight:bold;margin-bottom:6px;">\\u26a0\\ufe0f Error</div>' +
      '<div style="word-break:break-word;">' + errors.map(function(e){return e;}).join('<br>') + '</div>' +
      '<div style="font-size:12px;opacity:0.8;margin-top:8px;">Click here to copy this error message</div>';
    d.onclick = function() {
      try {
        navigator.clipboard.writeText(allMsgs).then(function() {
          d.querySelector('div:last-child').textContent = 'Copied!';
        });
      } catch(e) {}
    };
    document.body.insertBefore(d, document.body.firstChild);
  }
})();
</script>`;

function injectErrorHandler(files: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [path, content] of Object.entries(files)) {
    if (path.endsWith(".html") && !content.includes("__sendit_error")) {
      // Inject at the very start — before <!DOCTYPE> — so it loads first
      result[path] = ERROR_HANDLER_SCRIPT + content;
    } else {
      result[path] = content;
    }
  }
  return result;
}

export default function Preview({ files }: PreviewProps) {
  const rawFiles = files && Object.keys(files).length > 0 ? files : PLACEHOLDER_FILES;
  const activeFiles = useMemo(() => injectErrorHandler(rawFiles), [rawFiles]);

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
