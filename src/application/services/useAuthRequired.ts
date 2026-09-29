import { useAppState } from './useAppState.ts';
import { useRouter } from 'vue-router';
import { until } from '@vueuse/core';

/**
 * Function that is used in App for checking user authorization
 * Works only for routes with authRequired set to true in route.meta
 * If user is not authorized, redirects to the authorization page
 */
export default function useAuthRequired(): void {
  const router = useRouter();
  const { user } = useAppState();

  /**
   * For each route check if auth is required
   * The login popup is opened from the authorization page by a click, browsers block popups opened without it
   */
  router.beforeEach(async (to) => {
    if (to.meta.authRequired !== true) {
      return true;
    }

    /**
     * Wait until authorization process is finished
     */
    await until(user).not.toBe(undefined);

    if (user.value === null) {
      return {
        name: 'authorization',
        query: { redirect: to.fullPath },
      };
    }

    return true;
  });
}
