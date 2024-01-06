import { usePostMessage } from './usePostMessage';
import { authService } from '@/domain';

interface UseOAuthComposableState {
  /**
   * Shows a popup window with google authorization
   */
  showGoogleAuthPopup: () => void;
  /**
   * Logs out the user
   */
  logout: () => Promise<void>;
}

/**
 * Methods for working with Auth
 */
export default function useAuth(): UseOAuthComposableState {
  /**
   * Google OAuth URL
   */
  const loginUrl = import.meta.env.VITE_GOOGLE_OAUTH_URL as string;

  /**
   * Id of the postMessage callback
   */
  let callbackId: number | null = null;

  const { on, off } = usePostMessage();

  /**
   * Shows a popup window with google authorization
   */
  function showGoogleAuthPopup(): void {
    /**
     * Open popup at the center of the screen
     */
    const popupWidth = 600;
    const popupHeight = 400;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;

    window.open(
      loginUrl,
      'oauth',
      `popup=true, width=600, height=400, left=${left}, top=${top}`
    );

    if (callbackId !== null) {
      off(callbackId);
    }

    callbackId = on(async (event) => {
      if ('accessToken' in event.data && 'refreshToken' in event.data) {
        await authService.acceptSession(event.data.accessToken, event.data.refreshToken);

        off(callbackId as number);
      }
    });
  }
  /**
   *Logs out the user by deleting the refresh token in local storage
   */
  async function logout(): Promise<void> {
    await authService.logout();
  }

  return {
    showGoogleAuthPopup,
    logout,
  };
}

