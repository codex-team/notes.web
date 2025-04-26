import DomainError from './Base';

/**
 * Domain error thrown when unknown error occurs
 */
export default class ResourceUnavailableError extends DomainError {
  /**
   * Constructor for ResourceUnavailableError error
   * @param message - Error message
   * @param statusCode - Error status code
   */
  constructor(message: string = 'Internal server error', statusCode: number = 500) {
    super(message, statusCode);
    this.name = 'ResourceUnavailableError';
  }
}
