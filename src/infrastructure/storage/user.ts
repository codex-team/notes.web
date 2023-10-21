import type { User } from '@/domain/entities/User';
import { SubscribableStore } from './abstract/subscribable';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Data stored in the user store
 */
export type UserStoreData = {
  /**
   * User data
   */
  user: User | null;

  editorTools: EditorTool[];
};

/**
 * Store for the user data
 */
export class UserStore extends SubscribableStore<UserStoreData> {
  /**
   * Returns user data
   */
  public getUser(): User | null {
    return this.data.user;
  }

  /**
   * Sets user data
   *
   * @param user - data to set
   */
  public setUser(user: User): void {
    this.data.user = user;
  }

  /**
   * array of tools
   */
  public getUserEditorTools(): EditorTool[] {
    return this.data.editorTools;
  }

  /**
   * Setter
   *
   * @param editorTools - editor plugins
   */
  public setUserEditorTools(editorTools: EditorTool[]): void {
    this.data.editorTools = editorTools;
  }
}
