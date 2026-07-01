import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const COMPANION = path.join(ROOT, "plugins", "opencode", "scripts", "opencode-companion.mjs");

function runCompanion(args) {
  return spawnSync(process.execPath, [COMPANION, ...args], { encoding: "utf8" });
}

test("opencode-companion.mjs has no syntax errors (regression: was a broken, un-templated `$name-companion` literal)", () => {
  const result = runCompanion(["--help"]);
  assert.equal(result.status, 0);
  assert.doesNotMatch(result.stderr, /SyntaxError/);
});

test("opencode-companion.mjs --help prints usage", () => {
  const result = runCompanion(["--help"]);
  assert.match(result.stdout, /Usage:/);
});

test("opencode-companion.mjs task reports an honest, detectable stub error", () => {
  const result = runCompanion(["task", "hello"]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /is a stub/i);
  assert.equal(result.stdout, "");
});
