import type { AlertOptions } from './types';
import { POSITION } from './types';
/**
 * ID generator
 */
const getId = (i => () => i++)(0);

const ALERT_CONTAINER_STYLES: AlertOptions = {
  id: 0,
  position: POSITION.BOTTOM_CENTER,
  message: '',
  icon: '',
  type: null,
  timeout: 10000,
};

export { getId, ALERT_CONTAINER_STYLES };
