import type AuthSession from '@/domain/entities/AuthSession';

/**
 * The name of event
 */
export const AUTH_COMPLETED_EVENT_NAME = 'auth-completed';

/**
 * Use cross domain events to explicitly implement side effects of changes within of a domain
 */
export class AuthCompletedEvent extends CustomEvent<AuthSession | null> {
  /**
   * Constructor options
   * @param payload - Auth session if user is authorized or null if not
   */
  constructor(payload: AuthSession | null) {
    super(AUTH_COMPLETED_EVENT_NAME, {
      detail: payload,
    });
  }
}
