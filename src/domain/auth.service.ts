import type AuthRepository from '@/domain/auth.repository.interface';
import type EventBus from '@/domain/event-bus';
import { AuthCompletedEvent } from './event-bus/events/AuthCompleted';
import UnauthorizedError from './entities/errors/Unauthorized';
import { AuthLogoutEvent } from './event-bus/events/AuthLogoutEvent';

/**
 * Business logic for Authentication
 */
export default class AuthService {
  /**
   * Facade for accessing auth data
   */
  private readonly repository: AuthRepository;

  /**
   * Service constructor
   * @param eventBus - Common domain event bus
   * @param authRepository - Auth repository instance
   */
  constructor(
    private readonly eventBus: EventBus,
    authRepository: AuthRepository
  ) {
    this.repository = authRepository;

    if (this.repository.hasSession()) {
      this.repository
        .restoreSession()
        .then((session) => {
          this.acceptSession(session.accessToken, session.refreshToken);
        })
        .catch(async (error) => {
          if (error instanceof UnauthorizedError && error.message === 'Session is not valid') {
            console.warn('❌ Auth session expired');

            await this.logout();
          }

          throw error;
        });
    } else {
      this.continueAnonymousSession();
    }
  }

  /**
   * Called after oauth to accept session
   * @param accessToken - token got from backend. Used to access protected resources
   * @param refreshToken - token got from backend. Used to refresh access token
   */
  public acceptSession(accessToken: string, refreshToken: string): void {
    this.eventBus.dispatchEvent(
      new AuthCompletedEvent({
        accessToken,
        refreshToken,
      })
    );
  }

  /**
   * Removes auth session from the backend
   */
  public async logout(): Promise<void> {
    await this.repository.removeSession();

    /**
     * Event to notify all listeners about logout
     */
    this.eventBus.dispatchEvent(new AuthLogoutEvent());
  }

  /**
   * We know that current user is not authorized.
   *
   * Tells the app to continue working in anonymous mode
   */
  private continueAnonymousSession(): void {
    this.eventBus.dispatchEvent(new AuthCompletedEvent(null));
  }
}
