/**
 * Plugin that connects to the editor based on user settings
 */
export interface EditorTool {
    /**
     * Unique identifier of the tool. Nano-ID
     */
    id: string;

    /**
     * Plugin id that editor will use,
     *  e.g. "warning", "list", "linkTool"
     */
    name: string;

    /**
     * User-friendly name that will be shown in marketplace,
     *  .e.g "Warning tool 3000"
     */
    title: string;

    /**
     *Name of the plugin's class,
      e.g. "LinkTool", "Checklist", "Header"
     */
    exportName: string;

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
        cdn?: string;
    }
}