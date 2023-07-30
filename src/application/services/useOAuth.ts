import { usePostMessage } from './usePostMessage';
import { authService } from '@/domain';

interface UseOAuthComposableState {
  /**
   * Shows a popup window with google authorization
   */
  showGoogleAuthPopup: () => void;
}

/**
 * Methods for working with OAuth (Google)
 */
export default function useOAuth(): UseOAuthComposableState {
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

    const win = window.open(
      loginUrl,
      'oauth',
      `popup=true, width=600, height=400, left=${left}, top=${top}`
    );

    /**
     * @todo test in safari
     */
    win.addEventListener('beforeunload', (e) => {
      /**
       * Chrome doesn't fire beforeunload without this
       *
       * @see https://stackoverflow.com/a/37948250
       */
      e.returnValue = 'CodeX was here';

      if (callbackId !== null) {
        off(callbackId);
      }
    });

    callbackId = on((event) => {
      console.log('post message!', event);

      if ('accessToken' in event.data && 'refreshToken' in event.data) {
        authService.acceptSession(event.data.accessToken, event.data.refreshToken);

        off(callbackId as number);
      }
    });
  }

  return {
    showGoogleAuthPopup,
  };
}
