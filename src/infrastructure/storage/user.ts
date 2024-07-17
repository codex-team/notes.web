import type { User } from '@/domain/entities/User';
import { SessionStore } from './abstract/session';
import type EditorTool from '@/domain/entities/EditorTool';

/**
 * Data stored in the user store
 */
export type UserStoreData = {
  /**
   * User data
   */
  user: User | null;

  /**
   * User editor tools that are used in notes creation
   */
  editorTools: EditorTool[];
};

/**
 * Store for the user data
 */
export class UserStore extends SessionStore<UserStoreData> {
  /**
   * Returns user data
   */
  public getUser(): User | null {
    return this.data.user;
  }

  /**
   * Sets user data
   * @param user - data to set
   */
  public setUser(user: User): void {
    this.data.user = user;
  }

  /**
   * Removes user data
   */
  public clearUser(): void {
    this.data.user = null;
  }

  /**
   * Array of tools
   */
  public getUserEditorTools(): EditorTool[] {
    return this.data.editorTools;
  }

  /**
   * Set editor tools that are used in notes creation
   * @param editorTools - editor plugins
   */
  public setUserEditorTools(editorTools: EditorTool[]): void {
    this.data.editorTools = editorTools;
  }

  /**
   * Adds a tool to the user
   * @param editorTool - tool to add
   */
  public addEditorTool(editorTool: EditorTool): void {
    this.data.editorTools = [...this.data.editorTools, editorTool];
  }

  /**
   * Removes a tool from the user
   * @param id - tool id
   */
  public removeEditorTool(id: EditorTool['id']): void {
    this.data.editorTools = this.data.editorTools.filter(tool => tool.id !== id);
  }
}
