/**
 * What MCP client can do with notes of the token owner
 */
export type McpTokenPermission = 'read' | 'write';

/**
 * Personal token used by MCP clients (Claude, Cursor, etc.) to access user notes
 */
export interface McpToken {
  /**
   * Token id
   */
  id: number;

  /**
   * Last characters of the token, used to tell tokens apart
   */
  preview: string;

  /**
   * What MCP client can do with notes of the token owner
   */
  permission: McpTokenPermission;

  /**
   * Label set by user, e.g. "Claude Code on laptop"
   */
  label: string;

  /**
   * Last time token was used to call MCP tool
   */
  lastUsedAt: string | null;

  /**
   * How many times token was used to call MCP tools
   */
  requestCount: number;

  /**
   * When token was created
   */
  createdAt: string;
}

/**
 * Token returned right after creation. Plain token is shown only once
 */
export interface CreatedMcpToken {
  /**
   * Plain token to paste into MCP client config
   */
  token: string;

  /**
   * Created token record
   */
  item: McpToken;
}
