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
   * Tools are downloaded in parallel, a tool that fails to load is skipped so the editor works with the rest
   * @param tools - request list of tools
   */
  public async getToolsLoaded(tools: EditorTool[]): Promise<EditorToolLoaded[]> {
    const loadedTools = await Promise.all(tools.map(async (tool) => {
      const storedTool = this.store.getToolByName(tool.name);

      if (storedTool) {
        return storedTool;
      }

      try {
        const downloadedTool = await this.transport.downloadTool(tool);

        if (downloadedTool === undefined) {
          return undefined;
        }

        const toolClassAndInfo = {
          class: downloadedTool,
          tool,
        };

        this.store.addTool(toolClassAndInfo);

        return toolClassAndInfo;
      } catch {
        console.warn(`Failed to download the ${tool.name} editor tool from ${tool.source.cdn}`);

        return undefined;
      }
    }));

    return loadedTools.filter((tool): tool is EditorToolLoaded => tool !== undefined);
  }

  /**
   * Returns a loaded tool by name
   * @param name - tool name is not unique in the system, but unique in the user's tools
   */
  public getToolByName(name: string): EditorToolLoaded | undefined {
    return this.store.getToolByName(name);
  }
}
