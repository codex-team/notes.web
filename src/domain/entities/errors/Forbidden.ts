import DomainError from './Base';

/**
 * Domain error thrown when user does not have permission
 */
export default class ForbiddenError extends DomainError {
  /**
   * Constructor for NotFound error
   * @param message - Error message
   */
  constructor(message: string = 'Permission denied') {
    super(message);
    this.name = 'ForbiddenError';
  }
};
