import type { AlertOptions } from './types';
import { POSITION } from './types';

/**
 * default styles
 */
const ALERT_CONTAINER_STYLES: AlertOptions = {
  position: POSITION.BOTTOM_CENTER,
  message: '',
  icon: '',
  type: undefined,
  timeout: 50000,
};

export { ALERT_CONTAINER_STYLES };
