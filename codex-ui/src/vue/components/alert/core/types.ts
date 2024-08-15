import type { Ref } from 'vue';

/**
 * Various alert type
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * position of alert, default position -> bottom-center
 */
export enum POSITION {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_CENTER = 'bottom-center'
}

export declare type ALERTID = string | number;

declare type Icon = string;

/**
 * alert configuration
 */
export interface AlertOptions {
  /**
   *  ID of the alert.
   */
  id?: ALERTID;
  /**
   * Custom icon class to be used.
   *
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

export interface AlertInterface {
  /**
   * DOM reference to the alert container
   */
  alertRef: Ref<unknown>;

  /**
   * Iterated store of alerts
   */
  alertStore: Ref<AlertOptions[]>;

  /**
   * trigger success alert
   * @param opt - alert options
   */
  success: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger error alert
   * @param opt - alert options
   */
  error: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger warning alert
   * @param opt - alert options
   */
  warning: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger info alert
   * @param opt - alert options
   */
  info: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger default alert
   * @param opt - alert options
   */
  defaultAlert: (opt: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;
}
