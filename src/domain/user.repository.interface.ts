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
}
