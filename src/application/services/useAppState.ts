import { AppStateController } from '@/domain';
import type EditorTool from '@/domain/entities/EditorTool';
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

  /**
   * User editor tools that are used in notes creation
   */
  editorTools: Ref<EditorTool[]>

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
   * User editor tools that are used in notes creation
   */
  const editorTools = ref<EditorTool[]>([]);

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.user((prop: 'user' | 'editorTools',  value: User | EditorTool[] | null) => {
    if (prop === 'user') {
      user.value = value as User;
    }
    if (prop === 'editorTools') {
      editorTools.value = value as EditorTool[];
    }
  });

  return {
    user,
    editorTools,
  };
});
