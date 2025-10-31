# Testing Your MCP Server

Your GitHub OAuth MCP server is running at: `http://localhost:8788`

## 🚀 Quick Start

### Test with MCP Inspector

Run the test script:
```bash
./test-inspector.sh
```

Or manually:
```bash
npx @modelcontextprotocol/inspector npx mcp-remote http://localhost:8788/mcp
```

This will:
1. Launch the MCP Inspector in your browser
2. Redirect you to GitHub OAuth (enterprise: symbolaico)
3. After authentication, show your available tools

## 🔧 Available Tools

1. **add** - Simple math addition
   ```json
   {"a": 5, "b": 10}
   ```

2. **userInfoOctokit** - Get your GitHub profile
   ```json
   {}
   ```

3. **generateImage** - AI image generation (llu77 only)
   ```json
   {"prompt": "a futuristic cityscape", "steps": 8}
   ```

## 📱 Connect to Claude Desktop

1. Copy `mcp.json` to your Claude config directory:
   ```bash
   # macOS/Linux
   cp mcp.json ~/.config/Claude/mcp.json

   # Or merge with existing config
   ```

2. Restart Claude Desktop

3. Your tools will appear in the 🔨 tools menu

## 🌐 Connect to Claude Code

1. Copy the server configuration:
   ```bash
   cp mcp.json .claude/mcp.json
   ```

2. Restart Claude Code

## 📊 Server Endpoints

- **OAuth Authorization:** `http://localhost:8788/authorize`
- **OAuth Token:** `http://localhost:8788/token`
- **OAuth Callback:** `http://localhost:8788/callback`
- **Client Registration:** `http://localhost:8788/register`
- **MCP Protocol (New):** `http://localhost:8788/mcp`
- **MCP Protocol (Legacy SSE):** `http://localhost:8788/sse`

## 🔑 OAuth Configuration

- **GitHub OAuth App Client ID:** `Ov23lipQSLmCU6xDfHlg`
- **Enterprise:** `symbolaico`
- **Scopes:** `read:user`

## 🐛 Troubleshooting

### OAuth redirect fails
- Verify GitHub OAuth App callback URL is set to: `http://localhost:8788/callback`

### Tools don't appear
- Check Claude Desktop console for connection errors
- Verify `npx mcp-remote` is installed and working

### Image generation fails
- Ensure you're authenticated as user `llu77`
- Check Cloudflare AI binding is working
- Verify CLOUDFLARE_API_TOKEN has AI permissions

## 📝 Server Logs

Check your Wrangler dev console for:
- `[OAuth] Token exchange` logs
- `[OAuth Error]` messages
- Request/response details

## 🚀 Next Steps

Once tested locally:
1. Deploy to Cloudflare Workers
2. Update GitHub OAuth App with production callback URL
3. Update `mcp.json` with production URL:
   ```
   https://my-mcp-server-github-auth.your-subdomain.workers.dev/mcp
   ```
