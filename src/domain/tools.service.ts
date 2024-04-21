import type ToolsRepository from '@/domain/tools.repository.interface';
import type EventBus from '@/domain/event-bus';
import { AUTH_COMPLETED_EVENT_NAME } from './event-bus/events/AuthCompleted';

/**
 * Implication service for tools
 */
export default class ToolsService {
  /**
   * Facade for accessing tools data
   */
  private readonly repository: ToolsRepository;

  /**
   * Service constructor
   *
   * @param eventBus - Common domain event bus
   * @param toolsRepository - repository instance
   */
  constructor(
    private readonly eventBus: EventBus,
    toolsRepository: ToolsRepository
  ) {
    this.repository = toolsRepository;

    /**
     * When we got authorized
     */
    eventBus.addEventListener(AUTH_COMPLETED_EVENT_NAME, () => {
      void this.repository.loadUserEditorTools();
    });
  }

  /**
   * Adds a tool to the user
   *
   * @param id - tool id
   */
  public async addTool(id: string): Promise<void> {
    return await this.repository.addTool(id);
  }

  /**
   * Removes a tool from the user
   *
   * @param id - tool id
   */
  public async removeTool(id: string): Promise<void> {
    return await this.repository.removeTool(id);
  }
}
