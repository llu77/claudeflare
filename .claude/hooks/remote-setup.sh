#!/bin/bash

# Example hook: Only run in remote environments
# This demonstrates how to use the CLAUDE_CODE_REMOTE environment variable
# to conditionally run setup commands when working in remote environments.

if [ "$CLAUDE_CODE_REMOTE" != "true" ]; then
  exit 0
fi

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
  npm install
fi

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
fi
