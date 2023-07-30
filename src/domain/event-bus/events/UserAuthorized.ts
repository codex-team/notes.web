import type AuthSession from '@/domain/entities/AuthSession';

/**
 * The name of event
 */
export const USER_AUTHORIZED_EVENT_NAME = 'user-authorized';

/**
 * Use cross domain events to explicitly implement side effects of changes within of a domain
 */
export default class UserAuthorizedEvent extends CustomEvent<AuthSession> {
  /**
   * Constructor options
   *
   * @param payload - data to send with event
   */
  constructor(payload: AuthSession) {
    super(USER_AUTHORIZED_EVENT_NAME, {
      detail: payload,
    });
  }
}

