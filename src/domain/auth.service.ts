import type AuthRepository from '@/domain/auth.repository.interface';
import type EventBus from '@/domain/event-bus';
import AuthCompletedEvent from './event-bus/events/AuthCompleted';

/**
 * Business logic for Authentication
 */
export default class AuthService {
  /**
   * Facade for accessing auth data
   */
  private readonly repository: AuthRepository;

  /**
   * Note Service constructor
   *
   * @param eventBus - Common domain event bus
   * @param authRepository - Auth repository instance
   */
  constructor(private readonly eventBus: EventBus, authRepository: AuthRepository) {
    this.repository = authRepository;
  }

  /**
   * Called after oauth to accept session
   *
   * @param accessToken - token got from backend. Used to access protected resources
   * @param refreshToken - token got from backend. Used to refresh access token
   */
  public async acceptSession(accessToken: string, refreshToken: string): Promise<void> {
    this.eventBus.dispatchEvent(new AuthCompletedEvent({
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
