import { inject } from 'vue';
import type { ToastInterface, ToastOptions } from './constant';
import { EVENTS, ToastType } from './constant';

const toastSymbolKey = Symbol('Alert');

type Events = {
  [EVENTS.ADD]: {
    id: string;
  };
};

type Handler<E extends EVENTS> = (event: Events[E]) => void;

type HandlerList<E extends EVENTS> = Handler<E>[];
type HandlerMap = {
  [E in EVENTS]?: HandlerList<E>
};

/**
 *
 */
class EventBus {
  protected allHandlers: HandlerMap = {};

  protected getHandlers<E extends EVENTS>(eventType: E) {
    return (this.allHandlers[eventType]) || [];
  }

  public on<E extends EVENTS>(eventType: E, handler: Handler<E>) {
    const handlers = this.getHandlers(eventType).push(handler);

    this.allHandlers[eventType] = handlers as unknown as EventBus['allHandlers'][E ];
  }

  public off<E extends EVENTS>(eventType: E, handler: Handler<E>) {
    const handlers = this.getHandlers(eventType);

    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
  }

  public emit<E extends EVENTS>(eventType: E, event: Events[E]) {
    return this.getHandlers(eventType).forEach(handler => handler(event));
  }
};

const eventBus = new EventBus();

interface ToastInstance {
  (option?: ToastOptions): ToastInterface;
}

const toastId = (i: number = 0) => i++;

/**
 *
 * @param eventBus
 */
const useToast = (eventBus?: EventBus) => {
  if (!eventBus) {
    return;
  }

  const toastMethod = <T extends ToastType = ToastType> (type: T) => {
    eventBus.emit(EVENTS.ADD, eventBus);

    return {
      id: toastId(),
      type,
    };
  };

  return {
    success: toastMethod(ToastType.SUCCESS),
    error: toastMethod(ToastType.ERROR),
    info: toastMethod(ToastType.INFO),
    warning: toastMethod(ToastType.WARNING),
    default: toastMethod(ToastType.DEFAULT),
  };
};

export {
  useToast
};
