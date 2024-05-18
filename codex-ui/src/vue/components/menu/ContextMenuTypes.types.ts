/**
 * Type of the context menu items - may be default or separator
 */
export type ContextMenuItems = DefaultItem | SeparatorItem;

export interface DefaultItem {
  /**
   * Type of the item
   */
  type: 'default';

  /**
   * Name of the item icon
   */
  icon: string;

  /**
   * Primary text of the menu item
   */
  title: string;

  /**
   * The function that is called when click
   */
  onActivate: () => void;
}

/**
 * It is used to separate default items
 */
export interface SeparatorItem {
  /**
   * Type of the item
   */
  type: 'separator';
}
