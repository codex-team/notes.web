import { AppStateController, editorToolsService } from '@/domain';
import type EditorTool from '@/domain/entities/EditorTool';
import type { User } from '@/domain/entities/User';
import { createSharedComposable } from '@vueuse/core';
import { type Ref, ref, watch } from 'vue';

/**
 * Composable for the application state
 */
interface UseAppStateComposable {
  /**
   * Current authenticated user
   * User is undefined if authorization is in process
   * User is null if is not authorized, User instance otherwise
   */
  user: Ref<User | null | undefined>;

  /**
   * User editor tools that are used in notes creation.
   * Undefined means that tools have not been loaded yet.
   */
  userEditorTools: Ref<EditorTool[] | undefined>;
}

/**
 * App State — is a read-only combination of app Stores.
 */
export const useAppState = createSharedComposable((): UseAppStateComposable => {
  /**
   * Current authenticated user
   */
  const user = ref<User | null | undefined>(undefined);

  /**
   * User editor tools that are used in notes creation
   */
  const userEditorTools = ref<EditorTool[] | undefined>();

  /**
   * Subscribe to user changes in the App State
   */
  AppStateController.user((prop: 'user' | 'editorTools', value: User | EditorTool[] | null) => {
    if (prop === 'user') {
      user.value = value as User;
    }
    if (prop === 'editorTools') {
      userEditorTools.value = value as EditorTool[];
    }
  });

  /**
   * Download user tools in the background, so the first opened note does not wait for them
   */
  watch(userEditorTools, (tools) => {
    if (tools !== undefined) {
      void editorToolsService.getToolsLoaded(tools);
    }
  });

  return {
    user,
    userEditorTools,
  };
});
