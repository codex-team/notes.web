/**
 * User repository interface provided by domain
 */
export default interface UserRepositoryInterface {
  restoreSession(refreshToken: string): Promise<void>;
  removeSession(): Promise<void>;
}
