/**
 * Plugin that connects to the editor based on user settings
 */
export interface EditorTool {
    /**
     * Unique identifier of the tool. Nano-ID
     */
    id: string;

    /**
     * Technical id of the tool, like 'header', 'list', 'linkTool'
     */
    pluginId: string;

    /**
     * User-friendly plugin title
     */
    name: string;

    /**
     * Name of the tool class. Since it's imported globally,
     * we need the class name to properly connect the tool to the editor
     */
    class: string;

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