/**
 * Various alert type
 */
export type Alertype = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * alert configuration
 */
export interface AlertOptions {

  id?: number;
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
   *  Type of the alert.
   *
   *  Can be any of `(success, error, default, info, warning)`
   */
  type?: Alertype;
  /**
   *  Position of the alert on the screen.
   *
   * (bottom-center).
   */
  position?: 'bottom-center';
  /**
   * How many milliseconds for the alert to be auto dismissed
   */
  timeout?: number;
}
