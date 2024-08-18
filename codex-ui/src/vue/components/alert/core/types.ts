import type { Ref } from 'vue';

/**
 * Various alert type
 */
export type Alertype = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * position of alert, default position -> bottom-center
 */
export enum POSITION {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  BOTTOM_CENTER = 'bottom-center'
}

/**
 * alert configuration
 */
export interface AlertOptions {
  /**
   * Custom icon class to be used.
   *
   */
  icon?: string;
  /**
   * content to be rendered
   */
  message?: string;
  /**
   *  Type of the toast.
   *
   *  Can be any of `(success, error, default, info, warning)`
   */
  type?: Alertype;
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
   * Iterated store of alerts
   */
  alertStore: Ref<AlertOptions[]>;

  /**
   * trigger success alert
   * @param opt - alert options
   */
  success: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger error alert
   * @param opt - alert options
   */
  error: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger warning alert
   * @param opt - alert options
   */
  warning: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger info alert
   * @param opt - alert options
   */
  info: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;

  /**
   * trigger default alert
   * @param opt - alert options
   */
  defaultAlert: (opt?: Pick<AlertOptions, 'icon' | 'message' | 'timeout'>) => void;
}
