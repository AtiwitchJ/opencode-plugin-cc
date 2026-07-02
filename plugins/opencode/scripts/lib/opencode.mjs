import { binaryAvailable, formatCommandFailure, runCommand } from "./process.mjs";

const BINARY = "opencode";

export function getOpenCodeAvailability(cwd) {
  return binaryAvailable(BINARY, ["--version"], { cwd });
}

export async function getOpenCodeAuthStatus(cwd) {
  const availability = getOpenCodeAvailability(cwd);
  if (!availability.available) {
    return {
      available: false,
      loggedIn: false,
      detail: `OpenCode CLI is missing: ${availability.detail}`,
      source: "binary"
    };
  }
  return {
    available: true,
    loggedIn: true,
    detail: "OpenCode CLI is available; command execution will surface any provider authentication errors.",
    source: "binary"
  };
}

export function ensureOpenCodeAvailable(cwd) {
  const availability = getOpenCodeAvailability(cwd);
  if (!availability.available) {
    throw new Error(
      `OpenCode CLI is not installed or is missing required runtime support (${availability.detail}). Install OpenCode, then rerun /opencode:setup.`
    );
  }
}

export async function runOpenCode(cwd, options = {}) {
  ensureOpenCodeAvailable(cwd);
  const prompt = String(options.prompt ?? options.defaultPrompt ?? "").trim();
  const result = runCommand(BINARY, ["run", prompt], { cwd });
  const failure = result.error
    ? result.error.message
    : result.status === 0
      ? ""
      : formatCommandFailure(result);
  return {
    status: result.error ? 1 : result.status,
    text: result.stdout.trim(),
    stderr: result.stderr.trim(),
    error: failure,
    sessionId: null
  };
}

export async function findLatestResumableSession() {
  return null;
}

export const AGENT_RUNTIME = {
  agent: "opencode",
  displayName: "OpenCode",
  cliLabel: "OpenCode CLI",
  installHint: "Install OpenCode and make sure the `opencode` binary is on PATH.",
  authHint: "Authenticate OpenCode with your configured provider, then rerun /opencode:setup.",
  getAvailability: getOpenCodeAvailability,
  getAuthStatus: getOpenCodeAuthStatus,
  ensureAvailable: ensureOpenCodeAvailable,
  run: runOpenCode
};
