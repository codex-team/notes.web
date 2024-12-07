/**
 * Various alert type
 */
export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * alert configuration
 */
export interface AlertOptions {
  /** unique alert id */
  id?: number;

  /**
   * Custom icon class to be used.
   *
   */
  icon?: string;

  /**
   * content to be rendered
   */
  message: string;

  /**
   *  Type of the alert.
   *
   *  Can be any of `(success, error, default, info, warning)`
   */
  type?: AlertType;

  /**
   * How many milliseconds for the alert to be auto dismissed
   */
  timeout?: number;
}
