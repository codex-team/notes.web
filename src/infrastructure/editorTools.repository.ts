import Repository from './repository';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorToolsStore, EditorToolsStoreData } from '@/infrastructure/storage/editorTools';
import type EditorToolsRepositoryInterface from '@/domain/editorTools.repository.interface';
import type EditorToolsTransport from '@/infrastructure/transport/editorTools.transport';
import type { EditorToolLoaded } from '@/domain/entities/EditorTool';

/**
 * Facade for editor tools
 */
export default class EditorToolsRepository
  extends Repository<EditorToolsStore, EditorToolsStoreData>
  implements EditorToolsRepositoryInterface {
  /**
   * Transport instance
   */
  private readonly transport: EditorToolsTransport;

  /**
   * Repository constructor
   * @param store - stores user data
   * @param toolsTransport - tools transport instance
   */
  constructor(store: EditorToolsStore, toolsTransport: EditorToolsTransport) {
    super(store);

    this.transport = toolsTransport;
  }

  /**
   * Get stored tools plugins, if tool not exists, download it
   *
   * @param tools - request list of tools
   */
  public async getToolsLoaded(tools: EditorTool[]): Promise<EditorToolLoaded[]> {
    const configTools: EditorToolLoaded[] = [];

    for (const tool of tools) {
      const storedTool = this.store.getTool(tool.name);

      if (storedTool) {
        configTools.push(storedTool);
      } else {
        try {
          const downloadedTool = await this.transport.downloadTool(tool);

          if (downloadedTool === undefined) {
            continue;
          }

          const toolClassAndInfo = {
            class: downloadedTool,
            tool,
          };

          this.store.addTool(tool.name, toolClassAndInfo);

          configTools.push(toolClassAndInfo);
        } catch (error) {
          throw new Error(`Failed to download ${tool.name}.`);
        }
      }
    }

    return configTools;
  }

  /**
   * Returns a loaded tool by name
   * @param name - tool name is not unique in the system, but unique in the user's tools
   */
  public getToolByName(name: string): EditorToolLoaded | undefined {
    return this.store.getToolByName(name);
  }
}
