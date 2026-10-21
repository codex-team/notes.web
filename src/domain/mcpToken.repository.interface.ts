import type { CreatedMcpToken, McpToken, McpTokenPermission } from './entities/McpToken';

/**
 * Interface of the MCP tokens repository
 */
export default interface McpTokenRepositoryInterface {
  /**
   * Loads all MCP tokens of the current user
   */
  getTokens(): Promise<McpToken[]>;

  /**
   * Creates new MCP token
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  createToken(label: string, permission: McpTokenPermission): Promise<CreatedMcpToken>;

  /**
   * Revokes MCP token
   * @param id - token id
   */
  revokeToken(id: McpToken['id']): Promise<void>;
}
