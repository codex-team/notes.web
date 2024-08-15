import type { AlertOptions } from './types';
import { POSITION } from './types';
/**
 * ID generator
 */
const getId = (i => () => i++)(0);

/**
 * default styles
 */
const ALERT_CONTAINER_STYLES: AlertOptions = {
  id: getId(),
  position: POSITION.BOTTOM_CENTER,
  message: '',
  icon: '',
  type: null,
  timeout: 50000,
};

export { getId, ALERT_CONTAINER_STYLES };
