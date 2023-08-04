import type { User } from '@/domain/entities/User';
import { SubscribableStore } from './abstract/subscribable';

/**
 * Data stored in the user store
 */
export type UserStoreData = {
  /**
   * User data
   */
  user: User | null;
};

/**
 * Store for the user data
 */
export class UserStore extends SubscribableStore<UserStoreData> {
  /**
   * Returns user data
   */
  public getUser(): User | null {
    return this.data.user;
  }

  /**
   * Sets user data
   *
   * @param user - data to set
   */
  public setUser(user: User): void {
    this.data.user = user;
  }
}
