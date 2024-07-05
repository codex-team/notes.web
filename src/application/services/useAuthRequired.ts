import { useAppState } from './useAppState.ts';
import useAuth from './useAuth.ts';
import { useRouter } from 'vue-router';

/**
 * Function that is used in App for checking user authorization
 * Works only for routes with authRequired set to true in route.meta
 * If user is not authorized will show auth popup
 */
export default function useAuthRequired(): void {
  const { showGoogleAuthPopup } = useAuth();
  const router = useRouter();
  const { user } = useAppState();

  /**
   * Check if user is authorized
   * @returns true if user is authorized, false otherwise
   */
  function isUserAuthorized(): boolean {
    return (user.value !== null);
  }

  /**
   * For each route check if auth is required
   */
  router.beforeEach((actualRoute, _, next) => {
    if (actualRoute.meta.authRequired === true && !isUserAuthorized()) {
      /**
       * If auth is required and user is not autorized
       * Then show google auth popup and redirect user to auth page
       */
      showGoogleAuthPopup();
      next(`/auth?redirect=${actualRoute.fullPath?.toString()}`);
    } else {
      next();
    }
  });
}
