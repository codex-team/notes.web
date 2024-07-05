import { useAppState } from './useAppState';
import useAuth from './useAuth.ts';
import { useRouter } from 'vue-router';

/**
 * Function that is used in App for checking user authorization
 * Works only for routes with authGuard set to true in route.meta
 * If user is not authorized will show auth popup
 */
export default function useAuthGuard(): void {
  const { showGoogleAuthPopup } = useAuth();

  const router = useRouter();

  const { user } = useAppState();

  function checkUserAuthorization(): void {
    /**
     * If user is not authorized show google auth popup
     * @todo - add redirect to the authorization page
     */
    if (user.value === null) {
      showGoogleAuthPopup();
    }
  }

  /**
   * For each route with meta.authGuard set to true will be checked authorization
   */
  router.beforeResolve((actualRoute, prevRoute) => {
    if (prevRoute.name !== 'settings') {
      if (actualRoute.meta.authGuard === true) {
        checkUserAuthorization();
      }
    }
  });
}
