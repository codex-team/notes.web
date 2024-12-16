import DomainError from './Base';

/**
 * Domain error thrown when unknown error occurs
 */
export default class ApiError extends DomainError {
  /**
   * Constructor for ApiError error
   * @param message - Error message
   * @param statusCode - Error status code
   */
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}
