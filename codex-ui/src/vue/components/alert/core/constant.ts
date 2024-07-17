const ALERT_NAMESPACE = 'notex-alert';

const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

/**
 * ID generator
 */
const getId = (i => () => i++)(0);

export { ALERT_NAMESPACE, isUndefined, getId };
