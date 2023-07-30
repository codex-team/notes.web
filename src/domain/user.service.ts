import type UserRepository from '@/domain/user.repository.interface';

/**
 * Business logic for User
 */
export default class UserService {
  /**
   * Facade for accessing user data
   */
  private readonly repository: UserRepository;

  /**
   * Note Service constructor
   *
   * @param userRepository - User repository instance
   */
  constructor(userRepository: UserRepository) {
    this.repository = userRepository;
  }

  logout() {
    this.repository.removeSession();
  }
}
