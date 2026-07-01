# OpenCode plugin for Claude Code

This plugin is for Claude Code users who want to delegate code reviews or tasks to the
local OpenCode CLI ([opencode.ai](https://opencode.ai)).

## What You Get (once implemented)

- `/opencode:review` for a normal read-only review
- `/opencode:adversarial-review` for a steerable challenge review
- `/opencode:rescue`, `/opencode:transfer`, `/opencode:status`, `/opencode:result`, and `/opencode:cancel`
- `/opencode:setup` to verify the CLI and authentication

## Requirements

- **`opencode` CLI** installed locally. Install with: `npm install -g opencode-ai`
- Authentication: run `!opencode auth`
- **Node.js 18.18 or later**

## Installing the scaffold

```bash
/plugin marketplace add <your-org>/opencode-plugin-cc
/plugin install opencode@agents-plugin-cc-opencode
```

The scaffold ships with stub commands that will fail with a "not implemented" error
until you wire up `plugins/opencode/scripts/lib/opencode.mjs` and
`plugins/opencode/scripts/opencode-companion.mjs`.

## Implementing the plugin

1. Open `plugins/opencode/scripts/lib/opencode.mjs` and replace the stub functions with real
   implementations that:
   - detect `opencode` availability (`binaryAvailable` is already imported)
   - probe authentication (`getOpenCodeAuthStatus`)
   - invoke the CLI in the foreground and capture its output (`runOpenCode`)
   - discover a resumable session if available (`findLatestResumableSession`)
2. Open `plugins/opencode/scripts/opencode-companion.mjs` and copy the body of
   `../kilo-plugin-cc/plugins/kilo/scripts/kilo-companion.mjs`, renaming the imports from
   `./lib/kilo.mjs` to `./lib/opencode.mjs` and the `runKilo` calls to your new wrapper.
3. Add tests under `tests/` that cover argument parsing, state, and the new wrapper.

## Reference

See `../kilo-plugin-cc/` for a complete working example.

## License

Apache-2.0