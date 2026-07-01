import { binaryAvailable } from "./process.mjs";
/**
 * opencode wrapper - stub.
 * Copy ../kilo-plugin-cc/plugins/kilo/scripts/lib/kilo.mjs and adapt:
 *   - replace kilo binary with $binary
 *   - replace --format json with OpenCode's equivalent output flag
 *   - replace kilo profile auth probe with $binary's equivalent
 *   - replace kilo session list resume lookup with $binary's equivalent
 */
export function getOpenCodeAvailability(cwd) { return binaryAvailable("opencode", ["--version"], { cwd }); }
export async function getOpenCodeAuthStatus(cwd) {
  return { available: false, loggedIn: false, detail: "opencode-companion is a stub.", source: "stub" };
}
export async function runOpenCode() {
  throw new Error("opencode-companion is a stub. Implement scripts/lib/opencode.mjs.");
}
export async function findLatestResumableSession(cwd) { return null; }