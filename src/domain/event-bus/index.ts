import type { AUTH_COMPLETED_EVENT_NAME, AuthCompletedEvent } from './events/AuthCompleted';
import type { AUTH_LOGOUT_EVENT_NAME, AuthLogoutEvent } from './events/AuthLogoutEvent';

/**
 * Event Bus provides a loosely coupled communication way between Domain and some other layers
 *
 * Extends native event emitter called EventTarget
 */
export default class EventBus extends EventTarget {}

/**
 * All cross domain events map
 */
export type CrossDomainEventMap = {
  [AUTH_COMPLETED_EVENT_NAME]: AuthCompletedEvent;
  [AUTH_LOGOUT_EVENT_NAME]: AuthLogoutEvent;
};

/**
 * Augment EventTarget's addEventListener method to accept CustomEvent
 */
declare global {
  interface EventTarget {
    addEventListener<T extends keyof CrossDomainEventMap>(
      type: T,
      listener: (event: CrossDomainEventMap[T]) => void,
    ): void;
  }
}
