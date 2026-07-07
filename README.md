# OpenCode plugin for Claude Code and Codex

This plugin is for Claude Code and Codex users who want to delegate code reviews or tasks to the
local OpenCode CLI ([opencode.ai](https://opencode.ai)).

## What You Get

- `/opencode:review` for a normal read-only review
- `/opencode:adversarial-review` for a steerable challenge review
- `/opencode:rescue`, `/opencode:transfer`, `/opencode:status`, `/opencode:result`, and `/opencode:cancel`
- `/opencode:setup` to verify the CLI and authentication

## Requirements

- **`opencode` CLI** installed locally. Install with: `npm install -g opencode-ai`
- Authentication: run `!opencode auth`
- **Node.js 18.18 or later**

## Install in Claude Code

```bash
/plugin marketplace add <your-org>/opencode-plugin-cc
/plugin install opencode@agents-plugin-cc-opencode
```

## Install in Codex

```bash
codex plugin marketplace add ./.agents/plugins/marketplace.json
codex plugin add opencode@agents-plugin-cc-opencode
```

Start a new Codex thread after installing or updating the plugin. Codex-facing skills live
under `plugins/opencode/skills/` and call `plugins/opencode/scripts/opencode-companion.mjs`.

## Runtime

The companion invokes the local OpenCode CLI with `opencode run <prompt>`. `/opencode:setup`
or `node plugins/opencode/scripts/opencode-companion.mjs setup --json` reports missing
CLI/authentication steps without returning a placeholder error.

## Reference

See `../kilo-plugin-cc/` for the reference implementation this runtime follows.

## License

Apache-2.0
