/* eslint-disable-next-line boundaries/element-types */
import { SubscribableStore } from './subscribable';

export class PersistantStore<StoreData extends Record<string, unknown>> extends SubscribableStore<StoreData> {
  /**
   * Keys of the StoreData type
   * Used to separate the needed local storage information
   */
  protected readonly keysStored: string[];

  /**
   * Proxy for data stored
   */
  protected data: StoreData;

  /**
   * Storage that would retain information when proxy is cleared
   */
  private storage = window.localStorage;

  constructor(keysStored: string[]) {
    super();
    this.keysStored = keysStored;
    this.data = new Proxy<StoreData>(this.loadInitialData(), this._data);
  };

  protected get _data(): ProxyHandler<StoreData> {
    return {
      get: (target, prop) => {
        const item = this.storage.getItem(prop as string);

        return item !== null ? JSON.parse(item) : undefined;
      },

      set: (target, prop, value, receiver) => {
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
   * @returns data stored in localStorage in normalized form for proxy
   */
  private loadInitialData(): StoreData {
    const storedData = {} as StoreData;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);

      if (key !== null && this.keysStored.includes(key)) {
        const storedValue = this.storage.getItem(key);

        if (storedValue !== null) {
          storedData[key as keyof StoreData] = JSON.parse(storedValue);
        }
      }
    }

    return storedData;
  }
}
