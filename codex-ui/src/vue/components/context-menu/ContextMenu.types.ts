/**
 * Type of the context menu items - may be default or separator
 */
export type ContextMenuItem = DefaultItem | SeparatorItem | MessageItem;

/**
 * Interface representing default context menu item
 */
export interface DefaultItem {
  /**
   * Type of the item, may be omitted if the item is default
   */
  type?: 'default';

  /**
   * Name of the item icon
   */
  icon?: string;

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
 * Interface representing separator for separating default items
 */
export interface SeparatorItem {
  /**
   * Type of the item
   */
  type: 'separator';
}

/**
 * Interface representing message item in case if no items were found as a result of the search
 */
export interface MessageItem {
  /**
   * Type of the item
   */
  type: 'message';

  /**
   * Message what occurs as a result of the search
   */
  message: string;
};
