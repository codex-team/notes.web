/**
 * Various alert type
 */
export type AlerType = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * Various alert theme type
 */
export type AlertTheme = 'grass' | 'red' | 'amber' | 'graphite' | '';

/**
 * alert configuration
 */
export interface AlertOptions {
  /** unique alert id */
  id?: string;

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
  type?: AlerType;

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
