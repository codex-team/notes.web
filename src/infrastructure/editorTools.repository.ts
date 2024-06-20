import Repository from './repository';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorConfigTools } from '@/domain/entities/EditorTool';
import type { EditorToolsStore, EditorToolsStoreData } from '@/infrastructure/storage/editorTools';
import type EditorToolsRepositoryInterface from '@/domain/editorTools.repository.interface';
import type EditorToolsTransport from '@/infrastructure/transport/editorTools.transport';

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
   * Get stored tools, if tool not exists, download it
   * @param tools - request list of tools
   */
  public async getTools(tools: EditorTool[]): Promise<EditorConfigTools> {
    const configTools: EditorConfigTools = {};

    for (const tool of tools) {
      const storedTool = this.store.getTool(tool.name);

      if (storedTool) {
        configTools[tool.name] = storedTool;
      } else {
        try {
          const downloadedTool = await this.transport.downloadTool(tool);

          if (downloadedTool === undefined) {
            continue;
          }

          this.store.addTool(tool.name, downloadedTool);
          configTools[tool.name] = downloadedTool;
        } catch (error) {
          throw new Error(`Failed to download ${tool.name}.`);
        }
      }
    }

    return configTools;
  }
}
