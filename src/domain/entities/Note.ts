/**
 * Note entity
 */
export default class Note {
  /**
   * Note id
   */
  public id: number;

  /**
   * Note title
   */
  public title: string;

  /**
   * Note content
   */
  public content: string;

  /**
   * Note constructor
   *
   * @param title - Note title
   * @param content - Note content
   * @param id - Note id
   */
  constructor(title: string, content: string, id = 0) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}