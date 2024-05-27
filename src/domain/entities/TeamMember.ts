/**
 * Team member entity
 */
export interface TeamMember {
  /**
   * unique id of the team
   */
  id: number;

  /**
   * Note(noteId) associated with the team
   */
  noteId: number;

  /**
   * User(userId) of the user associated with the team
   */
  userId: string;

  /**
   * role of the team member e.g either READ(0) or WRITE(1) role
   */
  role: string;
}
