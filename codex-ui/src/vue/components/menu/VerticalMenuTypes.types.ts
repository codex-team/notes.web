/**
 * Type representing vertical menu item
 */
export type VerticalMenuItem = {
  /**
   * Primary text of the menu item
   */
  title: string;

  /**
   * Level of the vertical item
   */
  level: number;

  /**
   * Current item state
   */
  isActive?: boolean;
};
