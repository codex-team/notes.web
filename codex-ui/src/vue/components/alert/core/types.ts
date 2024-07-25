import type { App, Ref } from 'vue';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default';


export enum POSITION {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_CENTER = 'bottom-center',
}

export declare type ALERTID = string | number;

export declare type Icon = string;

interface AlertOptions {
  /**
   *  ID of the alert.
   */
  id?: ALERTID;
  /**
   * Custom icon class to be used.
   *
   * When set to `true`, the icon is set automatically depending on the toast type and `false` disables the icon.
   */
  icon?: Icon;
  /**
   * content to be rendered
   */
  message?: string | null;
  /**
   *  Type of the toast.
   *
   *  Can be any of `(success, error, default, info, warning)`
   */
  type: AlertType | null;
  /**
   *  Position of the toast on the screen.
   *
   * (bottom-center).
   */
  position?: POSITION.BOTTOM_CENTER;
  /**
   * How many milliseconds for the toast to be auto dismissed, or false to disable.
   */
  timeout?: number;
}

interface AlertInterface {
  /**
   * DOM reference to the alert container
   */
  alertRef: Ref<HTMLElement | null>;

  /**
   * iterated store of alerts
   */
  alertStore: Ref<AlertOptions[]>;
}

export declare interface BasePluginOptions extends AlertOptions {
  /**
   * Callback executed when the toast container is mounted.
   *
   * Receives the Container vue instance as a parameter.
   */
  onMounted?: (containerApp: App<Element>) => void;
}

export type { AlertOptions, AlertInterface };
