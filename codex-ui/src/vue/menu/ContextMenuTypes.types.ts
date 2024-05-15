/**
 * The size of the input
 */
export type Item = DefaultItem | SeparatorItem;

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
   * Item title
   */
  title: string;

  /**
   * The function that is called when click
   */
  onActivate: () => void;
}

export interface SeparatorItem {
  /**
   * Type of the item
   */
  type: 'separator';
}
