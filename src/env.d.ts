/**
 * Typescript Intellisense for VITE Environmental variables
 * Add VITE local variables here
 */
interface ImportMetaEnv {
  /** NoteX API server URL */
  VITE_API_URL: string;

  /** Google OAuth redirect URL */
  VITE_GOOGLE_OAUTH_URL: string;

  /** NoteX default production hostname */
  VITE_PRODUCTION_HOSTNAME: string;

  /** Hawk integration token. See https://hawk.so/ */
  VITE_HAWK_TOKEN: string;
}
