import type MarketplaceRepository from '@/domain/marketplace.repository.interface';
import type EditorTool  from './entities/EditorTool';
import { EditorToolWithUserBinding } from './entities/EditorTool';

/**
 * Business logic working with Marketplace
 */
export default class MarketplaceService {
  /**
   * Facade for accessing user data
   */
  private readonly repository: MarketplaceRepository;

  /**
   * Service constructor
   *
   * @param eventBus - Common domain event bus
   * @param marketplaceRepository - repository instance
   * @param marketplaceRepositoryRepository
   */
  constructor(marketplaceRepository: MarketplaceRepository) {
    this.repository = marketplaceRepository;
  }

  /**
   * Returns list of all tools data
   */
  public async getAllTools(): Promise<EditorTool[]> {
    return await this.repository.getToolsAvailable();
  }

  /**
   * Returns list of all tools with user binding
   *
   * @param userTools - user tools
   * @param availableTools - all available tools
   */
  public getToolsWithUserBindings(userTools: EditorTool[], availableTools: EditorTool[]): Promise<EditorToolWithUserBinding[]> {
    return availableTools.map((tool) => {
      return {
        ...tool,
        isInstalled: userTools.some((userTool) => userTool.id === tool.id),
      };
    });
  }
}
