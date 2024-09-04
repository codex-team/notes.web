/* eslint-disable-next-line boundaries/element-types */
import { SubscribableStore } from './subscribable';

export class SessionStore<StoreData extends Record<string, unknown>> extends SubscribableStore<StoreData> {
  /**
   * Proxy for data stored in store.
   * Used to watch data changes
   */
  protected data = new Proxy<StoreData>({} as StoreData, this._data);

  /**
   * Data proxy handler
   */
  protected get _data(): ProxyHandler<StoreData> {
    return {
      set: (target, prop, value, receiver) => {
        Reflect.set(target, prop, value, receiver);

        this.onDataChange([{ prop: prop as keyof StoreData,
          newValue: value }]);

        return true;
      },
      get(target, prop, receiver) {
        return Reflect.get(target, prop, receiver);
      },

      deleteProperty: (target, prop) => {
        return Reflect.deleteProperty(target, prop);
      },
    };
  }
}
