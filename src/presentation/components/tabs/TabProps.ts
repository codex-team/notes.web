/**
 * Props for Tab component
 */
export default interface TabProps {
  /**
   * Tab title
   */
  title: string;

  /**
   * Tab icon
   */
  icon?: string;

  /**
   * Is tab active
   */
  isActive?: boolean;

  /**
   * Link path
   */
  path: string;

  /**
   * Is tab pinned, in other words, can't be closed
   */
  isPinned?: boolean;

  /**
   * On close callback
   */
  onClose?: () => void;
}
