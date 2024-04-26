import Repository from './repository';
import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorConfigTool, EditorConfigTools } from '@/domain/entities/EditorTool';
import type { ToolsStore, ToolsStoreData } from '@/infrastructure/storage/tools';
import type ToolsRepositoryInterface from '@/domain/tools.repository.interface';
import { loadScript } from '@/infrastructure/utils/load-script';

/**
 * Facade for editor tools
 */
export default class ToolsRepository
  extends Repository<ToolsStore, ToolsStoreData>
  implements ToolsRepositoryInterface
{
  /**
   * Repository constructor
   *
   * @param store - stores user data
   */
  constructor(store: ToolsStore) {
    super(store);
  }

  /**
   * Get user tools
   *
   * @param toolsList - list requested tools
   */
  public async getTools(toolsList: EditorTool[]): Promise<EditorConfigTools> {
    const configTools: EditorConfigTools = {};

    for (const tool of toolsList) {
      const storedTool = this.store.getTool(tool.name);

      if (storedTool) {
        configTools[tool.name] = storedTool;
      } else {
        const downloadedTool = await this.downloadTool(tool);

        if (downloadedTool === undefined) {
          continue;
        }

        this.store.addTool(tool.name, downloadedTool);
        configTools[tool.name] = downloadedTool;
      }
    }

    return configTools;
  }

  /**
   * Download the user tool
   *
   * @param tool - tool for download
   */
  private async downloadTool(tool: EditorTool): Promise<EditorConfigTool | undefined> {
    if (tool.source.cdn === undefined) {
      throw new Error(`404 Not Found: We couldn't find ${tool.name}.`);
    }

    await loadScript(tool.source.cdn);

    return window[tool.exportName as keyof typeof window];
  }
}
