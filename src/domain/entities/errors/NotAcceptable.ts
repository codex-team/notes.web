import DomainError from './Base';

/**
 * Domain error thrown when some resource is not found
 */
export default class NotAcceptableError extends DomainError {
  /**
   * Constructor for NotFound error
   * @param message - Error message
   */
  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'NotAcceptableError';
  }
};
