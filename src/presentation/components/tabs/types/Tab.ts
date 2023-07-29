/**
 * Props for Tab component
 */
export default interface Tab {
  /**
   * Tab title
   */
  title: string;

  /**
   * Link path
   */
  path: string;

  /**
   * Tab icon
   */
  icon?: string;

  /**
   * Is tab active
   */
  isActive?: boolean;

  /**
   * Is tab pinned, in other words, can't be closed
   */
  isPinned?: boolean;

  /**
   * Is tab hidden, in other words, ignored during visualization
   */
  isHidden?: boolean;

  /**
   * On close callback
   */
  onClose?: () => void;
}
