export interface Tab {
  /**
   * Text to be displayed in tab
   */
  title: string;

  /**
   * Url where tab redirects on click
   */
  crossable: boolean;

  isActive: boolean;
};

export type TabList = Tab[];
