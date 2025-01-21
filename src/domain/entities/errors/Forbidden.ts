import DomainError from './Base';

/**
 * Domain error thrown when user does not have permission
 */
export default class ForbiddenError extends DomainError {
  /**
   * Constructor for NotFound error
   * @param message - Error message
   * @param statusCode - Error status code
   */
  constructor(message: string = 'Permission denied', public statusCode: number) {
    super(message);
    this.name = 'ForbiddenError';
  }
};
