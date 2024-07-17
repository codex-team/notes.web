import { useAppState } from './useAppState.ts';
import useAuth from './useAuth.ts';
import { useRouter } from 'vue-router';
import { until } from '@vueuse/core';

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
   * When oauth will work, it will be treated as he authorized manually
   * @returns true if user is authorized, false otherwise
   */
  async function isUserAuthorized(): Promise<boolean> {
    /**
     * Wait until authorization process is finished
     */
    await until(user).not.toBe(undefined);

    return user.value !== null;
  }

  /**
   * For each route check if auth is required
   */
  router.beforeEach(async (actualRoute, _, next) => {
    if (actualRoute.meta.authRequired === true && !(await isUserAuthorized())) {
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
