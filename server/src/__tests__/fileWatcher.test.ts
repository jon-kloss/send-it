import { describe, it, expect } from "vitest";
import { readAllFiles } from "../fileWatcher.js";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DIR = path.join(os.tmpdir(), "htcgf-test-workspace");

function setup() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });
}

function teardown() {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true });
  }
}

describe("readAllFiles", () => {
  it("returns empty object for empty directory", async () => {
    setup();
    try {
      const files = await readAllFiles(TEST_DIR);
      expect(files).toEqual({});
    } finally {
      teardown();
    }
  });

  it("reads HTML and CSS files with correct paths", async () => {
    setup();
    try {
      writeFileSync(path.join(TEST_DIR, "index.html"), "<h1>Hello</h1>");
      writeFileSync(path.join(TEST_DIR, "style.css"), "body { color: red; }");

      const files = await readAllFiles(TEST_DIR);

      expect(files["/index.html"]).toBe("<h1>Hello</h1>");
      expect(files["/style.css"]).toBe("body { color: red; }");
    } finally {
      teardown();
    }
  });

  it("ignores non-web files", async () => {
    setup();
    try {
      writeFileSync(path.join(TEST_DIR, "index.html"), "<h1>Hi</h1>");
      writeFileSync(path.join(TEST_DIR, "photo.png"), "binary data");
      writeFileSync(path.join(TEST_DIR, "data.txt"), "some text");

      const files = await readAllFiles(TEST_DIR);

      expect(Object.keys(files)).toEqual(["/index.html"]);
    } finally {
      teardown();
    }
  });

  it("ignores node_modules directory", async () => {
    setup();
    try {
      writeFileSync(path.join(TEST_DIR, "index.html"), "<h1>Hi</h1>");
      mkdirSync(path.join(TEST_DIR, "node_modules"), { recursive: true });
      writeFileSync(
        path.join(TEST_DIR, "node_modules", "package.json"),
        "{}"
      );

      const files = await readAllFiles(TEST_DIR);

      expect(Object.keys(files)).toEqual(["/index.html"]);
    } finally {
      teardown();
    }
  });

  it("reads files in subdirectories", async () => {
    setup();
    try {
      mkdirSync(path.join(TEST_DIR, "css"), { recursive: true });
      writeFileSync(path.join(TEST_DIR, "css", "main.css"), "h1 { }");

      const files = await readAllFiles(TEST_DIR);

      expect(files["/css/main.css"]).toBe("h1 { }");
    } finally {
      teardown();
    }
  });
});
