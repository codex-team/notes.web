import { AppStateController } from '@/domain';
import type { User } from '@/domain/entities/User';
import { createSharedComposable } from '@vueuse/core';
import { type Ref, ref } from 'vue';

/**
 * Composable for the application state
 */
interface UseAppStateComposable {
  /**
   * Current authenticated user
   */
  user: Ref<User | null>;
}

/**
 * App State — is a read-only combination of app Stores.
 */
export const useAppState = createSharedComposable((): UseAppStateComposable => {
  /**
   * Current authenticated user
   */
  const user = ref<User | null>(null);

  /**
   * Subscribe to user changes in the App State
   *
   * @todo create better type definition for params
   */
  AppStateController.user((prop: 'user', value: User) => {
    if (prop === 'user') {
      user.value = value;
    }
  });

  return {
    user,
  };
});
