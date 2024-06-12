export interface Page {
  /**
   * Text to be displayed in tab
   */
  title: string;

  /**
   * Url where tab redirects on click
   */
  url: string;
}

export type PageList = Page[];
