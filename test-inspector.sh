#!/bin/bash

# Test script for MCP Inspector with OAuth server
# This will launch the Inspector connected to your local MCP server

echo "🔍 Launching MCP Inspector..."
echo "Server: http://localhost:8788/mcp"
echo ""
echo "The Inspector will open in your browser."
echo "You'll be redirected to GitHub OAuth for authentication."
echo ""

npx @modelcontextprotocol/inspector npx mcp-remote http://localhost:8788/mcp
