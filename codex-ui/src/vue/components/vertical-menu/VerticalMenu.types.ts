/**
 * Type representing vertical menu item
 */
export type VerticalMenuItem = {
  /**
   * Primary text of the menu item
   */
  title: string;

  /**
   * Current item state
   */
  isActive?: boolean;

  /**
   * List of child elements for current element
   */
  items?: VerticalMenuItem[];
};
