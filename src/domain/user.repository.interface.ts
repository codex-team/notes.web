import type EditorTool from './entities/EditorTool';
import type { AddedToolData, RemovedToolData } from './entities/EditorTool';
import type { User } from './entities/User';

/**
 * Repository interface describes the methods that required by domain for its business logic implementation
 */
export default interface UserRepositoryInterface {
  /**
   * Loads and stores user data
   */
  loadUser: () => Promise<void>;

  /**
   * Return stored user data
   */
  getUser: () => User | null;

  /**
   * Removes user data from the storage
   */
  removeUser: () => Promise<void>;

  /**
   * Loads and store editor tools from user extensions
   */
  loadUserEditorTools: () => Promise<void>;

  /**
   * Returns array of editor tools
   */
  getUserEditorTools: () => EditorTool[];

  /**
   * Adds a tool to the user (marketplace mock)
   *
   * @param id - tool id
   */
  addTool: (id: string) => Promise<EditorTool>;

  /**
   * Removes a tool from the user (marketplace mock)
   *
   * @param id - tool id
   */
  removeTool: (id: string) => Promise<EditorTool['id']>;

  /**
   * Add tool to the store
   *
   * @param tool - tool to add
   */
  addToolToStore: (tool: EditorTool) => void;

  /**
   * Remove tool from the store
   *
   * @param id - tool id
   */
  removeToolFromStore: (id: EditorTool['id']) => void;
}
