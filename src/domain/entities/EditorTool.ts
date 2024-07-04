import type { ToolSettings, ToolConstructable } from '@editorjs/editorjs';

/**
 * Plugin that connects to the editor based on user settings
 */
export default interface EditorTool {
  /**
   * Unique identifier of the tool. Nano-ID
   */
  id: string;

  /**
   * Technical name of the tool, like 'header', 'list', 'linkTool'
   */
  name: string;

  /**
   * User-friendly plugin title
   */
  title: string;

  /**
   * Name of the tool class. Since it's imported globally,
   * we need the class name to properly connect the tool to the editor
   */
  exportName: string;

  /**
   * User ID who added the tool to the marketplace
   */
  userId: number | null;

  /**
   * Is plugin included by default in the editor
   */
  isDefault?: boolean;

  /**
   * Source of the tool to get it's code
   */
  source: {
    /**
     * Tool URL in content delivery network
     */
    cdn: string;
  };
}

/**
 * Editor tool with user binding
 */
export interface EditorToolWithUserBinding extends EditorTool {
  /**
   * Is tool included in user's editor settings
   */
  isInstalled: boolean;
}

/**
 * Tool creation attributes
 */
export type NewToolData = Omit<EditorTool, 'userId' | 'id'>;

/**
 * Part of the editor.js config for connecting a particular tool
 */
export type EditorjsConfigTool = ToolSettings | ToolConstructable;

/**
 * Editor tool info alogn with its plugin's class ready to use
 */
export interface EditorToolLoaded {
  /**
   * Tool class ready to use
   */
  class: EditorjsConfigTool;

  /**
   * NoteX Tool info
   */
  tool: EditorTool;
}
