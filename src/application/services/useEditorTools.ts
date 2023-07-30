import { ref, type Ref } from 'vue';

/**
 * Plugin that connects to the editor based on user settings
 */
export default interface EditorTool {
  /**
   * Unique identifier of the tool
   */
  id: string;

  /**
   * User-friendly plugin title
   */
  name: string;

  /**
   * Name of the tool class. Since it's imported globally,
   * we need the class name to properly connect the tool to the editor
   */
  class: string;

  description?: string;

  /**
   * Source of the tool to get it's code
   */
  source: {
    /**
     * Tool URL in content delivery network
     */
    cdn?: string;
  }
}

interface UseEditorToolsState {
  editorTools: Ref<EditorTool[]>;

  load: () => Promise<void>;
  isLoading: Ref<boolean>;
}

/**
 *
 */
export default function (): UseEditorToolsState {
  /**
   * Note ref
   */
  const editorTools = ref<UseEditorToolsState['editorTools'] | null>(null);

  /**
   * Is loading
   */
  const isLoading = ref<boolean>(false);

  /**
   * Get all editor tools
   */
  const load = async (): Promise<void> => {
    isLoading.value = true;

    editorTools.value = [ {
      id: 'tool#001',
      name: 'Header [Editor.js]',
      class: 'Header',
      description: 'Provides Headings Blocks for the Editor.js.',
      source: {
        cdn: 'https://cdn.jsdelivr.net/npm/@editorjs/header@latest',
      },
    }, {
      id: 'tool#002',
      name: 'Table [Editor.js]',
      class: 'Table',
      description: 'The Table Block for the Editor.js. Finally improved.',
      source: {
        cdn: 'https://cdn.jsdelivr.net/npm/@editorjs/table@latest',
      },
    }, {
      id: 'tool#003',
      name: 'Image [Editor.js]',
      class: 'Image',
      description: 'Image Block for the Editor.js.',
      source: {
        cdn: 'https://cdn.jsdelivr.net/npm/@editorjs/image@latest',
      },
    }, {
      id: 'tool#004',
      name: 'Bonkai [Editor.js]',
      class: 'Table',
      description: 'The Bonkai Block for the Editor.js. Finally improved.',
      source: {
        cdn: 'https://cdn.jsdelivr.net/npm/@editorjs/table@latest',
      },
    } ];

    isLoading.value = false;
  };

  return {
    load,
    editorTools,
    isLoading,
  };
}

