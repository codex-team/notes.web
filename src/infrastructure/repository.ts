import { SubscribableStore, type PropChangeCallback }  from './storage/base/subscribable';

/**
 * Base class for repositories
 * Contains common methods, e. g. for subscribing to store changes
 */
export default class Repository<Store, StoreData> {
  /**
   *  Creates repository instance
   *
   * @param store - store used by repository. Subscribable storage could be watched by App State
   */
  constructor(protected readonly store: Store) {}

  /**
   * Subscribe to store changes
   *
   * @param callback - callback that will be called on store change. Accepts new store data
   */
  public onStoreChange(callback: PropChangeCallback<StoreData> ): void {
    if (this.store instanceof SubscribableStore) {
      this.store.subscribe(callback);
    } else {
      throw new Error('Store is not subscribable');
    }
  }
}
