export interface TabParams {
  /**
   * Text to be displayed in tab
   */
  title: string;

  /**
   * Function of deleting the tab from tabbar or undefind if tab is not closable
   */
  onClose?: (tab: TabParams) => void;

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
   * On click on tab user will be redirected according to this url
   */
  url: string;
};

export type TabList = TabParams[];
