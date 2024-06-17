import type { EditorConfigTool } from '@/domain/entities/EditorTool';

/**
 * Data store for editor tools
 */
export type EditorToolsStoreData = Map<string, EditorConfigTool>;

/**
 * Editor tools storage
 */
export class EditorToolsStore {
  /**
   * Storage implementation
   */
  private storage: EditorToolsStoreData;

  /**
   * Creates storage instance
   */
  constructor() {
    this.storage = new Map();
  }

  /**
   * Save tool to storage
   * @param toolName - name of tool
   * @param editorTool - saved note
   */
  public addTool(toolName: string, editorTool: EditorConfigTool): void {
    this.storage.set(toolName, editorTool);
  }

  /**
   * Extract tool from storage
   * @param toolName - requisitioned tool name
   */
  public getTool(toolName: string): EditorConfigTool | undefined {
    const tool = this.storage.get(toolName);

    return tool;
  }

  /**
   * Extract tools from storage
   */
  private getTools(): EditorToolsStoreData {
    return this.storage;
  }
}
