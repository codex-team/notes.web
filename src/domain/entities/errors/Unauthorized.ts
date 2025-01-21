import DomainError from './Base';

/**
 * Domain error thrown when user is not authenticated
 */
export default class UnauthorizedError extends DomainError {
  /**
   * Constructor for unauthorized error
   * @param message - Error message
   * @param statusCode - Error status code
   */
  constructor(message: string = 'Unauthorized', public statusCode: number) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
