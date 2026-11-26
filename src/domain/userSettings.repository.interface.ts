import type { CreatedMcpToken, McpToken, McpTokenPermission } from './entities/McpToken';

/**
 * Interface of the user settings repository
 */
export default interface UserSettingsRepositoryInterface {
  /**
   * Loads all MCP tokens of the current user
   */
  getMcpTokens(): Promise<McpToken[]>;

  /**
   * Creates new MCP token
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  createMcpToken(label: string, permission: McpTokenPermission): Promise<CreatedMcpToken>;

  /**
   * Revokes MCP token
   * @param id - token id
   */
  revokeMcpToken(id: McpToken['id']): Promise<void>;
}
