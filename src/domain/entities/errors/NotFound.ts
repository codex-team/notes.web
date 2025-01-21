import DomainError from './Base';

/**
 * Domain error thrown when some resource is not found
 */
export default class NotFoundError extends DomainError {
  /**
   * Constructor for NotFound error
   * @param message - Error message
   * @param statusCode - Error status code
   */
  constructor(message: string = 'NotFound', public statusCode: number) {
    super(message);
    this.name = 'NotFoundError';
  }
}
