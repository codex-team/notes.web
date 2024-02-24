import type EditorTool from './entities/EditorTool';
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
  addTool: (id: string) => Promise<void>;

  /**
   * Removes a tool from the user (marketplace mock)
   *
   * @param id - tool id
   */
  removeTool: (id: string) => Promise<void>;
}
