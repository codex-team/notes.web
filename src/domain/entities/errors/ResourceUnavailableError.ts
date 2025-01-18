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
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ResourceUnavailableError';
  }
}
