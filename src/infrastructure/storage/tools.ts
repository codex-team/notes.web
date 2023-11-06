import type { EditorTool } from '@/domain/entities/EditorTool';
import { SubscribableStore } from './abstract/subscribable';

/**
 * Data stored in the user store
 */
export type EditorToolStoreData = {
  /**
   * User data
   */
  editorTool: EditorTool | null;
};

/**
 * Store for the editor tools
 */
export class EditorToolStore extends SubscribableStore<EditorToolStoreData> {
  /**
   * Returns tools
   */
  public getEditorTool(): EditorTool | null {
    return this.data.editorTool;
  }
  /**
     * Sets tools
     * @param editorTool
     */
  public setEditorTools(editorTool: EditorTool): void {
    this.data.editorTool = editorTool;
  }
}
