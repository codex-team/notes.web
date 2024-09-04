/**
 * Function that will be called on store property change
 */
export type PropChangeCallback<StoreData> = (prop: keyof StoreData, newValue: StoreData[typeof prop]) => void;

/**
 * Type represents one change that has been commited to stored data
 */
type Change<StoreData> = {
  /**
   * Property of stored data which was changed
   */
  prop: keyof StoreData;

  /**
   * New value of the stored data property
   */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  newValue: any;
};

/**
 * Base class for subscribable stores.
 * Allows to subscribe to store data changes
 */
export abstract class SubscribableStore<StoreData extends Record<string, unknown>> {
  /**
   * List of subscribers on data change
   */
  protected subscribers: PropChangeCallback<StoreData>[] = [];

  /**
   * Using for accumulation of changes in store until subscriber appearse
   */
  protected stashedChanges: Change<StoreData>[] = [];

  /**
   * Subscribe to store changes
   * @param callback - callback that will be called on store change. Accepts changed property and its new data
   */
  public subscribe(callback: PropChangeCallback<StoreData>): void {
    this.subscribers.push(callback);

    /**
     * When new service subscribed we should develop all stashed changes
     */
    this.onDataChange(this.stashedChanges);
  }

  /**
   * Used to clear memory when subscription is not needed anymore
   */
  public unsubscribe(): void {
    /**
     * @todo implement
     */
  }

  /**
   * Function called when store data is changed.
   * Notifies subscribers about data change.
   * @param changes - array of changes
   */
  protected onDataChange(changes: Change<StoreData>[]): void {
    /**
     * If there are no subscribers stash current change
     */
    if (this.subscribers.length === 0) {
      this.stashedChanges.push(changes[0]);
    } else {
      this.subscribers.forEach((callback) => {
        changes.forEach((change) => {
          callback(change.prop, change.newValue);
        });
      });

      /**
       * Clear stashed changes
       */
      this.stashedChanges = [];
    }
  }
}
