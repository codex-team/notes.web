export interface TabParams {
  /**
   * Name of the tab item
   */
  title: string;

  /**
   * If true we have cross icon on the right
   */
  closable?: boolean;

  /**
   * Current tab state
   */
  isActive?: boolean;

  /**
   * Link to image to be displayed in the left slot, else undefined
   */
  picture?: string;

  /**
   * Name of the icon to be diplayed in the left slot, else undefined
   */
  icon?: string;
};

export type TabList = TabParams[];
