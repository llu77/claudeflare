import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { Octokit } from "octokit";
import { z } from "zod";
import { GitHubHandler } from "./github-handler";

// Context from the auth process, encrypted & stored in the auth token
// and provided to the DurableMCP as this.props
type Props = {
	login: string;
	name: string;
	email: string;
	accessToken: string;
};

const ALLOWED_USERNAMES = new Set<string>([
	// Add GitHub usernames of users who should have access to the image generation tool
	'llu77', // Your GitHub username
]);

export class MyMCP extends McpAgent<Env, Record<string, never>, Props> {
	server = new McpServer({
		name: "Github OAuth Proxy Demo",
		version: "1.0.0",
	});

	async init() {
		// Hello, world!
		this.server.tool(
			"add",
			"Add two numbers the way only MCP can",
			{ a: z.number(), b: z.number() },
			async ({ a, b }) => ({
				content: [{ text: String(a + b), type: "text" }],
			}),
		);

		// Use the upstream access token to facilitate tools
		this.server.tool(
			"userInfoOctokit",
			"Get user info from GitHub, via Octokit",
			{},
			async () => {
				const octokit = new Octokit({ auth: this.props!.accessToken });
				return {
					content: [
						{
							text: JSON.stringify(await octokit.rest.users.getAuthenticated()),
							type: "text",
						},
					],
				};
			},
		);

		// Dynamically add tools based on the user's login. In this case, I want to limit
		// access to my Image Generation tool to just me
		if (ALLOWED_USERNAMES.has(this.props!.login)) {
			this.server.tool(
				"generateImage",
				"Generate an image using the `flux-1-schnell` model. Works best with 8 steps.",
				{
					prompt: z
						.string()
						.describe("A text description of the image you want to generate."),
					steps: z
						.number()
						.min(4)
						.max(8)
						.default(4)
						.describe(
							"The number of diffusion steps; higher values can improve quality but take longer. Must be between 4 and 8, inclusive.",
						),
				},
				async ({ prompt, steps }) => {
					const response = await this.env.AI.run("@cf/black-forest-labs/flux-1-schnell", {
						prompt,
						steps,
					});

					return {
						content: [{ data: response.image!, mimeType: "image/jpeg", type: "image" }],
					};
				},
			);
		}
	}
}

export default new OAuthProvider({
	// NOTE - during the summer 2025, the SSE protocol was deprecated and replaced by the Streamable-HTTP protocol
	// https://developers.cloudflare.com/agents/model-context-protocol/transport/#mcp-server-with-authentication
	apiHandlers: {
		"/sse": MyMCP.serveSSE("/sse"), // deprecated SSE protocol - use /mcp instead
		"/mcp": MyMCP.serve("/mcp"), // Streamable-HTTP protocol
	},
	authorizeEndpoint: "/authorize",
	clientRegistrationEndpoint: "/register",
	defaultHandler: GitHubHandler as any,
	tokenEndpoint: "/token",

	// OAuth 2.1 security: Disable implicit flow (not recommended)
	allowImplicitFlow: false,

	// Refresh token configuration: 30 days TTL
	// This allows long-lived sessions while maintaining security
	refreshTokenTTL: 2592000, // 30 days in seconds

	// Error handling for OAuth operations
	onError({ code, description, status, headers }) {
		console.error(`[OAuth Error] ${status} ${code}: ${description}`, {
			timestamp: new Date().toISOString(),
			code,
			status,
		});

		// Log specific error types for monitoring
		if (code === 'invalid_token' || code === 'expired_token') {
			console.warn('[OAuth] Token validation failed - user may need to re-authenticate');
		} else if (code === 'invalid_client') {
			console.error('[OAuth] Client authentication failed - check client credentials');
		}

		// Return undefined to use default error response
		// You can return a custom Response here if needed
	},

	// Token exchange callback for refresh token support
	tokenExchangeCallback: async (options) => {
		console.log(`[OAuth] Token exchange: ${options.grantType} for user ${options.userId}`);

		if (options.grantType === 'authorization_code') {
			// Initial authorization - props are already set in the callback handler
			console.log('[OAuth] Authorization code exchange - initial token grant');
			return {
				accessTokenProps: options.props,
			};
		}

		if (options.grantType === 'refresh_token') {
			// Refresh token flow - would refresh GitHub token here if using GitHub App
			console.log('[OAuth] Refresh token exchange - renewing access');

			// Note: GitHub OAuth Apps don't provide refresh tokens by default
			// If you migrate to GitHub App in the future, implement token refresh here:
			// const upstreamTokens = await refreshGitHubToken(options.props.refreshToken);

			return {
				accessTokenProps: options.props,
				// Future: Update with new upstream tokens
				// newProps: { ...options.props, accessToken: upstreamTokens.access_token }
			};
		}
	},
});
