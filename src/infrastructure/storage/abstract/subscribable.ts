/**
 * Function that will be called on store property change
 */
export type PropChangeCallback<StoreData> = (prop: keyof StoreData, newValue: StoreData[typeof prop]) => void;

/**
 * Base class for subscribable stores.
 * Allows to subscribe to store data changes
 */
export abstract class SubscribableStore<StoreData extends Record<string, unknown>> {
  /**
   * Proxy for data stored in store.
   * Used to watch data changes
   */
  protected data = new Proxy<StoreData>({} as StoreData, this._data);

  /**
   * List of subscribers on data change
   */
  private subscribers: PropChangeCallback<StoreData>[] = [];

  /**
   * Data proxy handler
   */
  protected get _data(): ProxyHandler<StoreData> {
    return {
      set: (target, prop, value, receiver) => {
        Reflect.set(target, prop, value, receiver);

        this.onDataChange(prop as keyof StoreData, value);

        return true;
      },
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },
    };
  }

  /**
   * Subscribe to store changes
   *
   * @param callback - callback that will be called on store change. Accepts changed property and its new data
   */
  public subscribe(callback: PropChangeCallback<StoreData>): void {
    this.subscribers.push(callback);
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
   *
   * @param prop - changed property
   * @param newValue - new value of changed property
   */
  private onDataChange(prop: keyof StoreData, newValue: StoreData[typeof prop]): void {
    this.subscribers.forEach((callback) => {
      callback(prop, newValue);
    });
  }
}
