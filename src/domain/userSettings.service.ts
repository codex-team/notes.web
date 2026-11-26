import type { CreatedMcpToken, McpToken, McpTokenPermission } from './entities/McpToken';
import type UserSettingsRepository from './userSettings.repository.interface';

/**
 * User settings service class, used for logic handling of the data,
 * Also used for data delivery from repository to application service
 */
export default class UserSettingsService {
  /**
   * User settings repository instance
   */
  private readonly userSettingsRepository: UserSettingsRepository;

  constructor(userSettingsRepository: UserSettingsRepository) {
    this.userSettingsRepository = userSettingsRepository;
  }

  /**
   * Loads all MCP tokens of the current user
   */
  public async getMcpTokens(): Promise<McpToken[]> {
    return await this.userSettingsRepository.getMcpTokens();
  }

  /**
   * Creates new MCP token
   * @param label - label set by user
   * @param permission - what MCP client can do with notes
   */
  public async createMcpToken(label: string, permission: McpTokenPermission): Promise<CreatedMcpToken> {
    return await this.userSettingsRepository.createMcpToken(label, permission);
  }

  /**
   * Revokes MCP token
   * @param id - token id
   */
  public async revokeMcpToken(id: McpToken['id']): Promise<void> {
    await this.userSettingsRepository.revokeMcpToken(id);
  }
}
