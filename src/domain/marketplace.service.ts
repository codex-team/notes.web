import type MarketplaceRepository from '@/domain/marketplace.repository.interface';
import type EditorTool from './entities/EditorTool';

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
}
