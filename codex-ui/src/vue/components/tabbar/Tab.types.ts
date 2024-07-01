export interface TabParams {
  /**
   * Unique tab identifier
   */
  id: string;

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

  /**
   * If passed, tab will be presented as an hyperlink
   */
  link?: string;
};

export type TabList = TabParams[];
