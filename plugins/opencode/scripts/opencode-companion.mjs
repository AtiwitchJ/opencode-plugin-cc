#!/usr/bin/env node
/**
 * opencode-companion - dispatcher stub for the OpenCode plugin.
 *
 * Implementation plan (copy from kilo-plugin-cc/plugins/kilo/scripts/kilo-companion.mjs):
 *   - swap `import "./lib/kilo.mjs"` for `import "./lib/opencode.mjs"`
 *   - swap `runKilo`/`getKiloAvailability`/`getKiloAuthStatus` calls for their
 *     `runOpenCode`/`getOpenCodeAvailability`/`getOpenCodeAuthStatus` equivalents
 *   - the CLI binary is `opencode`, not `kilo`
 */
import process from "node:process";

function printUsage() {
  console.log(
    [
      "Usage:",
      "  node scripts/opencode-companion.mjs setup [--json]",
      "  node scripts/opencode-companion.mjs review [--wait|--background] [--base <ref>] [--scope <auto|working-tree|branch>]",
      "  node scripts/opencode-companion.mjs adversarial-review [--wait|--background] [--base <ref>] [focus text]",
      "  node scripts/opencode-companion.mjs task [--background] [--write] [--resume|--fresh] [prompt]",
      "  node scripts/opencode-companion.mjs status [job-id] [--json]",
      "  node scripts/opencode-companion.mjs result [job-id] [--json]",
      "  node scripts/opencode-companion.mjs cancel [job-id] [--json]"
    ].join("\n")
  );
}

async function main() {
  const [subcommand] = process.argv.slice(2);
  if (!subcommand || subcommand === "help" || subcommand === "--help") {
    printUsage();
    return;
  }
  process.stderr.write(
    "`opencode-companion` is a stub. See ../kilo-plugin-cc/plugins/kilo/scripts/kilo-companion.mjs for a complete reference implementation. The CLI binary is `opencode`.\n"
  );
  process.exitCode = 1;
}

main();
