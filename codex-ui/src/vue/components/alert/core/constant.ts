import type { AlertOptions } from './types';
import { AlertType, POSITION } from './types';

const ALERT_NAMESPACE = 'notex-alert';

const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const emptyFunction = () => {};

/**
 * ID generator
 */
const getId = (i => () => i++)(0);

const ALERT_CONTAINER_DEFAULTS: Required<AlertOptions> = {
  id: 0,
  position: POSITION.BOTTOM_CENTER,
  status: AlertType.DEFAULT,
  timeout: 5000,
  onClick: emptyFunction,
  onClose: emptyFunction,
  closeOnClick: true,
  content: 'Hello',
  icon: 'Check',
};

export { ALERT_NAMESPACE, isUndefined, getId, ALERT_CONTAINER_DEFAULTS };
