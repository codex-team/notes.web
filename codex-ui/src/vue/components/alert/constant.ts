import type { AlertOptions } from './Alert.types';
import { POSITION } from './Alert.types';

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
