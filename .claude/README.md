# Claude Code Configuration

This directory contains the Claude Code configuration for the claudeflare repository.

## Files

### settings.json
Project-level settings shared with the team. This file configures:

- **enabledPlugins**: Controls which plugins are enabled for this project
  - `formatter@company-tools`: Enabled - Code formatting tools
  - `deployer@company-tools`: Enabled - Deployment utilities
  - `analyzer@security-plugins`: Disabled - Security analysis tools

- **extraKnownMarketplaces**: Defines additional plugin marketplaces
  - `company-tools`: GitHub-based marketplace at `company/claude-plugins`

### hooks/remote-setup.sh
Example hook script that demonstrates conditional execution based on the `CLAUDE_CODE_REMOTE` environment variable. This script:
- Only runs when `CLAUDE_CODE_REMOTE=true` (in remote environments)
- Installs Node.js dependencies if `package.json` exists
- Installs Python dependencies if `requirements.txt` exists

## Settings Scope

Claude Code supports three levels of settings:

1. **User settings** (`~/.claude/settings.json`): Personal plugin preferences
2. **Project settings** (`.claude/settings.json`): Project-specific plugins shared with team
3. **Local settings** (`.claude/settings.local.json`): Per-machine overrides (not committed to git)

This repository uses project settings to ensure consistent plugin configuration across the team.

## Usage

Team members working on this repository will automatically have access to:
- The `company-tools` marketplace
- The enabled plugins specified in the configuration

To override settings locally, create `.claude/settings.local.json` (this file is gitignored).
