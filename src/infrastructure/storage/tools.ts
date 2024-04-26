import type { EditorConfigTool } from '@/domain/entities/EditorTool';

/**
 * User editor tools that are used in notes creation
 */
export type ToolsStoreData = Record<string, EditorConfigTool>;

/**
 * Tools storage
 */
export class ToolsStore {
  /**
   * Storage implementation
   */
  private storage: Record<string, EditorConfigTool>;

  /**
   * Creates storage instance
   */
  constructor() {
    this.storage = {};
  }

  /**
   * Save tool to storage
   *
   * @param toolName - name of tool
   * @param editorTool - saved note
   */
  public addTool(toolName: string, editorTool: EditorConfigTool): void {
    const tools = this.getTools();

    this.setTools({ ...tools, [toolName]: editorTool });
  }

  /**
   * Extract tool from storage
   *
   * @param toolName - requisitioned tool name
   */
  public getTool(toolName: string): EditorConfigTool | undefined {
    const tools = this.getTools();

    return tools[toolName];
  }

  /**
   * Extract tools from storage
   */
  private getTools(): Record<string, EditorConfigTool> {
    return this.storage;
  }

  /**
   * Save tools to local storage
   *
   * @param tools - saved tools
   */
  private setTools(tools: Record<string, EditorConfigTool>): void {
    this.storage = tools;
  }
}
