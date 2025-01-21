/**
 * Domain Error — own class describing exceptions in our business-logic.
 * For example, when user is not authorized to perform some action.
 */
export default class DomainError extends Error {
  public statusCode?: number;
  /**
   * Constructor for Domain error
   * @param message - Error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}
