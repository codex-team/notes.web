import type { CreatedMcpToken, McpToken, McpTokenPermission } from './entities/McpToken';
import type McpTokenRepository from './mcpToken.repository.interface';

/**
 * MCP token service class, used for logic handling of the data,
 * Also used for data delivery from repository to application service
 */
export default class McpTokenService {
  /**
   * MCP token repository instance
   */
  private readonly mcpTokenRepository: McpTokenRepository;

  constructor(mcpTokenRepository: McpTokenRepository) {
    this.mcpTokenRepository = mcpTokenRepository;
  }

  /**
   * Loads all MCP tokens of the current user
   */
  public async getTokens(): Promise<McpToken[]> {
    return await this.mcpTokenRepository.getTokens();
  }

  /**
   * Creates new MCP token
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  public async createToken(label: string, permission: McpTokenPermission): Promise<CreatedMcpToken> {
    return await this.mcpTokenRepository.createToken(label, permission);
  }

  /**
   * Revokes MCP token
   * @param id - token id
   */
  public async revokeToken(id: McpToken['id']): Promise<void> {
    await this.mcpTokenRepository.revokeToken(id);
  }
}
