import type { Page } from './Page';

export interface Tab {
  /**
   * Text to be displayed in tab
   */
  title: string;

  /**
   * Function of deleting page from page list or undefind if tab is not closable
   */
  onClose?: (page: Page) => void;

  isActive: boolean;
};

export type TabList = Tab[];
