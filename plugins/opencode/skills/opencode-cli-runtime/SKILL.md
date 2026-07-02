---
name: opencode-cli-runtime
description: Operational guidance for calling the OpenCode CLI from this plugin's companion script.
---

# OpenCode CLI runtime

The OpenCode plugin wraps the local `opencode` CLI. The companion script is implemented and
uses the same command surface in Claude Code and Codex.

## Binary

- Command name: `opencode`
- Authentication: run the provider login required by your OpenCode install

## Invocation

- Availability probe: `opencode --version`
- Task/review execution: `opencode run <prompt>`
- Setup output: `node scripts/opencode-companion.mjs setup --json`

If `opencode` is missing or unauthenticated, setup reports actionable next steps. Runtime
commands should not describe the companion as a placeholder.
