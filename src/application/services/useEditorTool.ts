import type EditorTool from '@/domain/entities/EditorTool';
import { type Ref, ref } from 'vue';
import { editorToolService } from '@/domain';

/**
 * Composable for the application state
 */
interface UseEditorToolComposable {
  /**
   * All editor tools that are used in notes creation
   */
  allEditorTools: Ref<EditorTool[]>
}

/**
 * Application service for working with the Editor Tools
 */
export default function (): UseEditorToolComposable {
  /**
   *  All editor tools
   */
  const allEditorTools = ref<EditorTool[]>([]);

  /**
   * Get list of all tools
   */
  async (): Promise<void> => {
    allEditorTools.value = await editorToolService.getAllTools();
  };

  return {
    allEditorTools,
  };
}
