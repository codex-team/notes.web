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
  constructor(message: string = 'Permission denied', statusCode: number = 403) {
    super(message, statusCode);
    this.name = 'ForbiddenError';
  }
};
