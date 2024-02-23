import DomainError from './Base';

/**
 * Domain error thrown when access denied
 */
export default class ForbiddenError extends DomainError {
  /**
   * Constructor for Forbidden error
   *
   * @param message - Error message
   */
  constructor(message: string = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}