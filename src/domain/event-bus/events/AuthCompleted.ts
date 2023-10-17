import type AuthSession from '@/domain/entities/AuthSession';

/**
 * The name of event
 */
export const AUTH_COMPLETED_EVENT_NAME = 'auth-completed';

/**
 * Use cross domain events to explicitly implement side effects of changes within of a domain
 */
export class AuthCompletedEvent extends CustomEvent<AuthSession> {
  /**
   * Constructor options
   *
   * @param payload - data to send with event
   */
  constructor(payload: AuthSession) {
    super(AUTH_COMPLETED_EVENT_NAME, {
      detail: payload,
    });
  }
}

