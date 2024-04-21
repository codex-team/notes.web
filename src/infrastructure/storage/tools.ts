import type EditorTool from '@/domain/entities/EditorTool';
import { SubscribableStore } from './abstract/subscribable';

/**
 * User editor tools that are used in notes creation
 */
export type ToolsStoreData = {
  tools: EditorTool[];
};

/**
 * Tools storage
 */
export class ToolsStore extends SubscribableStore<ToolsStoreData> {
  /**
   * Set editor tools that are used in notes creation
   *
   * @param editorTools - editor plugins
   */
  public setUserEditorTools(editorTools: EditorTool[]): void {
    this.data.tools = editorTools;
  }

  /**
   * Get array of user tools
   */
  public getUserEditorTools(): EditorTool[] {
    return this.data.tools;
  }

  /**
   * Adds a tool to the user
   *
   * @param editorTool - tool to add
   */
  public addEditorTool(editorTool: EditorTool): void {
    this.data.tools = [...this.data.tools, editorTool];
  }

  /**
   * Removes a tool from the user
   *
   * @param id - tool id
   */
  public removeEditorTool(id: EditorTool['id']): void {
    this.data.tools = this.data.tools.filter((tool) => tool.id !== id);
  }
}
