---
description: Delegate investigation, an explicit fix request, or follow-up rescue work to the OpenCode rescue subagent
argument-hint: "[--background|--wait] [--resume|--fresh] [what OpenCode should investigate, solve, or continue]"
allowed-tools: Bash(node:*), AskUserQuestion, Agent
---

Invoke the `opencode:opencode-rescue` subagent via the `Agent` tool (`subagent_type: "opencode:opencode-rescue"`), forwarding the raw user request as the prompt.
`opencode:opencode-rescue` is a subagent, not a skill — do not call `Skill(opencode:opencode-rescue)` (no such skill) or `Skill(opencode:rescue)` (that re-enters this command and hangs the session).
The final user-visible response must be OpenCode's output verbatim.

Raw user request:
$ARGUMENTS

Execution mode:

- If the request includes `--background`, run the `opencode:opencode-rescue` subagent in the background.
- If the request includes `--wait`, run the `opencode:opencode-rescue` subagent in the foreground.
- If neither flag is present, default to foreground.

Operating rules:

- The subagent is a thin forwarder only. It should use one `Bash` call to invoke `node "${CLAUDE_PLUGIN_ROOT}/scripts/opencode-companion.mjs" task ...` and return that command's stdout as-is.
- Return the OpenCode companion stdout verbatim to the user.
- Do not paraphrase, summarize, rewrite, or add commentary before or after it.
- If OpenCode is missing or unauthenticated, stop and tell the user to run `/opencode:setup`.
- If the user did not supply a request, ask what OpenCode should investigate or fix.