/**
 * The name of event
 */
export const AUTH_LOGOUT_EVENT_NAME = 'auth-logout';

/**
 * Use cross domain events to explicitly implement side effects of changes within of a domain
 */
export class AuthLogoutEvent extends CustomEvent<null> {
  /**
   * Constructor options
   */
  constructor() {
    super(AUTH_LOGOUT_EVENT_NAME, {
      detail: null,
    });
  }
}
