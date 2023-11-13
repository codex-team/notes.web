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
  userEditorTools: Ref<EditorTool[]>
  /**
   * All editor tools that are used in notes creation
   */
  allEditorTools: Ref<EditorTool[]>
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
  const userEditorTools = ref<EditorTool[]>([]);

  /**
   *  All editor tools that are used in notes creation
   */
  const allEditorTools = ref<EditorTool[]>([]);

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.user((prop: 'user' | 'userEditorTools' | 'allEditorTools', value: User | EditorTool[] | EditorTool[] | null) => {
    if (prop === 'user') {
      user.value = value as User;
    }
    if (prop === 'userEditorTools') {
      userEditorTools.value = value as EditorTool[];
    }
    if (prop === 'allEditorTools') {
      allEditorTools.value = value as EditorTool[];
    }
  });

  return {
    user,
    userEditorTools,
    allEditorTools,
  };
});
