import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import "@xterm/xterm/css/xterm.css";
import type { SocketMessage } from "../hooks/useSocket";

interface TerminalProps {
  send: (msg: object) => void;
  connected: boolean;
  addMessageHandler: (handler: (msg: SocketMessage) => void) => () => void;
}

export default function Terminal({
  send,
  connected,
  addMessageHandler,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const sentInitialResize = useRef(false);

  // Initialize terminal
  useEffect(() => {
    if (!containerRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily:
        '"Cascadia Code", "Fira Code", "JetBrains Mono", Menlo, monospace',
      scrollback: 5000,
      theme: {
        background: "#1e1e1e",
        foreground: "#d4d4d4",
        cursor: "#d4d4d4",
        selectionBackground: "#264f78",
        black: "#1e1e1e",
        red: "#f44747",
        green: "#6a9955",
        yellow: "#d7ba7d",
        blue: "#569cd6",
        magenta: "#c586c0",
        cyan: "#4ec9b0",
        white: "#d4d4d4",
        brightBlack: "#808080",
        brightRed: "#f44747",
        brightGreen: "#6a9955",
        brightYellow: "#d7ba7d",
        brightBlue: "#569cd6",
        brightMagenta: "#c586c0",
        brightCyan: "#4ec9b0",
        brightWhite: "#ffffff",
      },
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(containerRef.current);
    fitAddon.fit();

    termRef.current = term;
    fitAddonRef.current = fitAddon;

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        if (fitAddonRef.current && termRef.current) {
          try {
            fitAddonRef.current.fit();
            send({
              type: "resize",
              cols: termRef.current.cols,
              rows: termRef.current.rows,
            });
          } catch {
            // Ignore fit errors during transitions
          }
        }
      });
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
      termRef.current = null;
      fitAddonRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Send terminal input
  useEffect(() => {
    const term = termRef.current;
    if (!term) return;

    const disposable = term.onData((data) => {
      send({ type: "input", data });
    });

    return () => disposable.dispose();
  }, [send]);

  // Handle incoming messages (output, error)
  useEffect(() => {
    return addMessageHandler((msg: SocketMessage) => {
      const term = termRef.current;
      if (!term) return;

      switch (msg.type) {
        case "output":
          if (msg.data) {
            term.write(msg.data);
          }
          break;
        case "error":
          term.writeln(`\r\n\x1b[31m${msg.message}\x1b[0m`);
          break;
      }
    });
  }, [addMessageHandler]);

  // Send initial resize when connected
  useEffect(() => {
    if (connected && termRef.current && !sentInitialResize.current) {
      sentInitialResize.current = true;
      send({
        type: "resize",
        cols: termRef.current.cols,
        rows: termRef.current.rows,
      });
    }
  }, [connected, send]);

  // Show connection status
  useEffect(() => {
    const term = termRef.current;
    if (!term) return;

    if (!connected) {
      term.writeln(
        "\r\n\x1b[33mConnection lost. Refresh to reconnect.\x1b[0m"
      );
    }
  }, [connected]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#1e1e1e",
        padding: "4px",
        boxSizing: "border-box",
      }}
    />
  );
}
