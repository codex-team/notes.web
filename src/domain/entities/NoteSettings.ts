/**
 * NoteSettings entity
 */
export default interface NoteSettings {
  /**
   * NoteSettings id
   */
  id: number;

  /**
   * Custom hostname
   */
  customHostname: string;

  /**
   * Is note enabled
   */
  enabled: boolean;
}
