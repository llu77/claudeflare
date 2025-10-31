# Claudeflare

Cloudflare MCP (Model Context Protocol) integration for Claude Code - Connect Claude to Cloudflare services through remote MCP servers.

## Features

- Multiple Cloudflare MCP servers configured
- TypeScript support with full type definitions
- Automated build process with pnpm
- Integration with Claude Code via MCP configuration

## Available MCP Servers

This project connects to the following Cloudflare MCP servers:

1. **cloudflare-docs** - Cloudflare documentation server
2. **cloudflare-bindings** - Cloudflare Workers bindings
3. **cloudflare-observability** - Monitoring and observability tools
4. **cloudflare-radar** - Cloudflare Radar API access
5. **cloudflare-browser** - Browser rendering services

## Prerequisites

- Node.js >= 18.0.0
- pnpm (installed by default in the environment)
- Claude Code CLI

## Installation

### 1. Install dependencies

```bash
pnpm install
```

Or use the build script:

```bash
./build.sh
```

### 2. Configure environment (optional)

Copy the example environment file and configure your API token:

```bash
cp .env.example .env
# Edit .env and add your CLOUDFLARE_API_TOKEN
```

## Usage

### Build the project

```bash
pnpm run build
```

### Run the application

```bash
pnpm start
```

### Development mode

```bash
pnpm run dev
```

## MCP Configuration

The MCP servers are configured in `.claude/mcp.json`. Claude Code will automatically detect and use these servers when working in this project.

To view or modify the MCP configuration:

```bash
cat .claude/mcp.json
```

## Project Structure

```
claudeflare/
├── .claude/              # Claude Code configuration
│   ├── mcp.json          # MCP servers configuration
│   ├── settings.json     # Project settings
│   └── README.md         # Configuration documentation
├── src/                  # Source TypeScript files
│   └── index.ts          # Main entry point
├── dist/                 # Compiled JavaScript output
├── build.sh              # Build and install script
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Development

### Adding new MCP servers

Edit `.claude/mcp.json` and add new server entries:

```json
{
  "mcpServers": {
    "your-server-name": {
      "command": "npx",
      "args": ["mcp-remote", "https://your-server-url/mcp"],
      "description": "Your server description"
    }
  }
}
```

### Building from source

1. Make changes to files in `src/`
2. Run `pnpm run build` to compile TypeScript
3. Test your changes with `pnpm start`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT

## Links

- [Cloudflare MCP Server](https://github.com/cloudflare/mcp-server-cloudflare)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Code Documentation](https://docs.claude.com/en/docs/claude-code)