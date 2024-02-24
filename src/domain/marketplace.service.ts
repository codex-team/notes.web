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
   * @param marketplaceRepository - repository instance
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
   * Add new tool to the marketplace
   *
   * @param tool - tool data
   */
  public async addTool(tool: Omit<EditorTool, 'userId' | 'id'>): Promise<EditorTool> {
    return await this.repository.addTool(tool);
  }
}
