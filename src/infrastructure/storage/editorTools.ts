import type { EditorToolLoaded } from '@/domain/entities/EditorTool';

/**
 * Data store for editor tools
 */
export type EditorToolsStoreData = Map<string, EditorToolLoaded>;

/**
 * Editor tools storage
 */
export class EditorToolsStore {
  /**
   * Storage implementation
   */
  private storage: EditorToolsStoreData;

  /**
   * Creates storage instance
   */
  constructor() {
    this.storage = new Map<string, EditorToolLoaded>();
  }

  /**
   * Save tool to storage
   * @param toolClassAndData - callable class and tools data
   */
  public addTool(toolClassAndData: EditorToolLoaded): void {
    this.storage.set(toolClassAndData.tool.name, toolClassAndData);
  }

  /**
   * Return a loaded tool by name
   * @param name - tool name. It is not unique in the system, but unique in the user's tools
   */
  public getToolByName(name: string): EditorToolLoaded | undefined {
    return this.storage.get(name);
  }
}
