import type UserRepository from '@/domain/user.repository.interface';
import type EventBus from '@/domain/event-bus';
import { AUTH_COMPLETED_EVENT_NAME } from './event-bus/events/AuthCompleted';
import type { User } from './entities/User';
import { AUTH_LOGOUT_EVENT_NAME } from './event-bus/events/AuthLogoutEvent';

/**
 * Business logic for User
 */
export default class UserService {
  /**
   * Facade for accessing user data
   */
  private readonly repository: UserRepository;

  /**
   * Service constructor
   *
   * @param eventBus - Common domain event bus
   * @param userRepository - repository instance
   */
  constructor(
    private readonly eventBus: EventBus,
    userRepository: UserRepository,
  ) {
    this.repository = userRepository;

    /**
     * When we got authorized
     */
    eventBus.addEventListener(AUTH_COMPLETED_EVENT_NAME, () => {
      void this.repository.loadUser();
      void this.repository.loadUserEditorTools();
    });
    /**
     * When we got unauthorized
     */
    eventBus.addEventListener(AUTH_LOGOUT_EVENT_NAME, () => {
      void this.repository.removeUser();
    });
  }

  /**
   * Returns user data
   */
  public getUser(): User | null {
    return this.repository.getUser();
  }

  /**
   * Adds a tool to the user (marketplace mock)
   *
   * @param id - tool id
   */
  public addTool(id: string): void {
    this.repository.addTool(id);
  }
}
