import type EditorTool from '@/domain/entities/EditorTool';
import type { EditorConfigTool } from '@/domain/entities/EditorTool';
import { loadScript } from '@/infrastructure/utils/load-script';

/**
 * Transport for fetching script from html element
 */
export default class EditorToolsTransport {
  /**
   * Download the user tool
   * @param tool - tool for download
   */
  public async downloadTool(tool: EditorTool): Promise<EditorConfigTool | undefined> {
    await loadScript(tool.source.cdn);

    return window[tool.exportName as keyof typeof window];
  }
}
