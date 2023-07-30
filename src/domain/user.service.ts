import type UserRepository from '@/domain/user.repository.interface';
import type EventBus from '@/domain/event-bus';
import UserAuthorizedEvent from './event-bus/events/UserAuthorized';

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
   * @param eventBus - Common domain event bus
   * @param userRepository - User repository instance
   */
  constructor(private readonly eventBus: EventBus, userRepository: UserRepository) {
    this.repository = userRepository;
  }

  /**
   * Called after oauth to accept session
   *
   * @param accessToken - token got from backend. Used to access protected resources
   * @param refreshToken - token got from backend. Used to refresh access token
   */
  public async acceptSession(accessToken: string, refreshToken: string): Promise<void> {
    this.eventBus.dispatchEvent(new UserAuthorizedEvent({
      accessToken,
      refreshToken,
    }));

    /**
     * @todo load user data
     */
    alert('User authorized');
  }

  /**
   * Removes auth session from the backend
   */
  public async logout(): Promise<void> {
    await this.repository.removeSession();
  }
}
