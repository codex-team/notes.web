import type { App, Ref } from 'vue';

export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  DEFAULT = 'default'
}

export enum EVENTS {
  ADD = 'add',
  DISMISS = 'dismiss',
  UPDATE = 'update',
  CLEAR = 'clear'
}

export enum POSITION {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOP_LEFT = 'top-left',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOP_CENTER = 'top-center',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TOP_RIGHT = 'top-right',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_LEFT = 'bottom-left',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_CENTER = 'bottom-center',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_RIGHT = 'bottom-right'
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
  content: string;
  /**
   *  Type of the toast.
   *
   *  Can be any of `(success, error, default, info, warning)`
   */
  status: AlertType.DEFAULT;
  /**
   *  Position of the toast on the screen.
   *
   *  Can be any of (top-right, top-center, top-left, bottom-right, bottom-center, bottom-left).
   */
  position: POSITION.BOTTOM_CENTER;
  /**
   * How many milliseconds for the toast to be auto dismissed, or false to disable.
   */
  timeout?: number;
  /**
   * Callback executed when the toast is clicked.
   *
   *  A closeToast callback is passed as argument to onClick when it is called.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: (closeToast: Function) => void;

  /**
   * Callback executed when the toast is closed.
   */
  onClose?: () => void;

  /**
   * Whether or not the toast is closed when clicked.
   */
  closeOnClick?: boolean;
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

  /**
   * show success alert
   * @param options - alert options
   */
  success: (options: AlertOptions) => void;

  /**
   * show error alert
   * @param option - alert options
   */
  error: (option: AlertOptions) => void;

  /**
   * show warning alert
   * @param options - alert options
   */
  warning: (options: AlertOptions) => void;

  /**
   * show info alert
   * @param options - alert options
   */
  info: (options: AlertOptions) => void;

  /**
   * show default alert
   * @param options - alert options
   */
  default: (options: AlertOptions) => void;
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
