
/**
 * @description - Typescript Intellisense for VITE Environmental variables
 * Add VITE local variables here
 */
interface ImportMetaEnv {
  /**
   * Notex hosted backend server url from environmental variable file(.env)
   */
  VITE_API_URL: string;
  /**
   * Notex google oauth url from environmental variable file (.env )
   */
  VITE_GOOGLE_OAUTH_URL: string;
  /**
   * local backend server url from environmental variable file (.env)
   */
  VITE_API_LOCAL_URL: string;
  /**
   * local google oauth url from environmental variable file (.env)
   * Add your preferred google oauth url
   */
  VITE_GOOGLE_LOCAL_OAUTH_URL: string;
}
