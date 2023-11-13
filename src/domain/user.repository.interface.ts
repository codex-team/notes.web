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
   * Loads and store editor tools from user extensions
   */
  loadUserEditorTools: () => Promise<void>;

  /**
   * Returns array of editor tools
   */
  getUserEditorTools: () => EditorTool[];
  /**
   * Loads and store all editor tools from user extensions
   */
  loadAllEditorTools: () => Promise<void>;

  /**
   * Returns array of editor tools
   */
  getAllEditorTools: () => EditorTool[];
  /**
   * Adds a tool to the user (marketplace mock)
   *
   * @param id - tool id
   */
  addTool: (id: string) => void;
}
