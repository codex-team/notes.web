/**
 * User unique identifier
 */
export type UserId = number;

/**
 * Represents a user
 */
export interface User {
  /**
   * User unique identifier
   */
  id: UserId;

  /**
   * Visible name
   */
  name: string;

  /**
   * Email
   */
  email: string;

  /**
   * Date of creation
   */
  createdAt: string;

  /**
   * Picture URL
   */
  photo: string;
}
