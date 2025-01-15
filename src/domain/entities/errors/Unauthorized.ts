import DomainError from './Base';

/**
 * Domain error thrown when user is not authenticated
 */
export default class UnauthorizedError extends DomainError {
  /**
   * Constructor for unauthorized error
   * @param message - Error message
   */
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
