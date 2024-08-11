/* eslint-disable-next-line boundaries/element-types */
import { SubscribableStore } from './subscribable';

type StoreDataWithOptionalFields<StoreData> = {
  [Property in keyof StoreData]: StoreData[Property] | undefined
};

export class PersistantStore<StoreData extends Record<string, unknown>> extends SubscribableStore<StoreData> {
  /**
   * Keys of the StoreData type
   * Used to separate the needed local storage information
   */
  protected readonly keysStored: string[];

  /**
   * Proxy for data stored
   */
  protected data: StoreDataWithOptionalFields<StoreData>;

  /**
   * Storage that would retain information when proxy is cleared
   */
  private storage = window.localStorage;

  constructor(keysStored: string[]) {
    super();
    this.keysStored = keysStored;
    this.data = new Proxy<StoreDataWithOptionalFields<StoreData>>({} as StoreDataWithOptionalFields<StoreData>, this._data);

    /**
     * Load data from local store to proxy
     */
    this.loadInitialData();
  };

  protected get _data(): ProxyHandler<StoreDataWithOptionalFields<StoreData>> {
    return {
      get: (target, prop) => {
        const item = this.storage.getItem(prop as string);

        try {
          return item !== null ? JSON.parse(item) : undefined;
        } catch {
          console.warn(`Persistant store: Cannot parse ${item}`);

          /**
           * Delete item that cannot be parsed
           */
          this.storage.removeItem(prop as string);
        }
      },

      set: (target, prop, value: StoreData, receiver) => {
        /**
         * Set new property value for proxy usage
         */
        Reflect.set(target, prop, value, receiver);

        /**
         * Set new property value for storage
         */
        this.storage.setItem(prop as string, JSON.stringify(value));

        this.onDataChange([{ prop: prop as keyof StoreData,
          newValue: value }]);

        return true;
      },

      deleteProperty: (target, prop) => {
        this.storage.removeItem(prop as string);

        return Reflect.deleteProperty(target, prop);
      },
    };
  }

  /**
   * Funciton for loading initial data from window.localStorage to proxy object
   * Data stored in localStorage would be normalized for proxy
   */
  private loadInitialData(): void {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);

      if (key !== null && this.keysStored.includes(key)) {
        const storedValue = this.storage.getItem(key);

        if (storedValue !== null) {
          try {
            this.data[key as keyof StoreData] = JSON.parse(storedValue) as StoreData[keyof StoreData];
          } catch {
            console.warn(`Persistant store: Cannot parse ${storedValue}`);

            /**
             * Delete item that cannot be parsed
             */
            this.storage.removeItem(key);
          }
        }
      }
    }
  }
}
