# MCP Servers

This directory contains Model Context Protocol (MCP) server implementations that extend Claude's capabilities when running in GitHub Actions.

## Available Servers

### github-ci
Provides CI/CD awareness tools:
- `get_ci_status` - Get CI status summary for PRs
- `get_workflow_run_details` - Get job and step details for workflow runs
- `download_job_log` - Download job logs to disk

### github-comment
Provides comment update functionality:
- `update_claude_comment` - Update Claude's progress comments on issues/PRs

### github-file-operations
Provides file operation tools:
- `commit_files` - Commit multiple files atomically
- `delete_files` - Delete files in a single commit

## Dependencies

**Note:** These MCP servers are reference implementations from the claude-code-action source. They have dependencies on:
- `@modelcontextprotocol/sdk`
- `@octokit/rest`
- `node-fetch`
- `zod`
- Internal action utilities (e.g., `../github/api/config`, `../utils/retry`)

To use these in your Claude Code Action workflow, they would need to be properly integrated with the action's dependency tree.

## Environment Variables

The MCP servers expect these environment variables:
- `GITHUB_TOKEN` - GitHub authentication token
- `REPO_OWNER` - Repository owner
- `REPO_NAME` - Repository name
- `BRANCH_NAME` - Current branch name
- `PR_NUMBER` - Pull request number (for CI server)
- `CLAUDE_COMMENT_ID` - Comment ID for updates
- `RUNNER_TEMP` - GitHub Actions temp directory
