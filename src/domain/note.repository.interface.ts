import Note from './entities/Note';

/**
 * Note repository interface
 */
export default interface NoteRepository {

    /**
     * Get note by id
     *
     * @param id - Note id
     * @returns Note | null - Note instance
     */
    getNoteById(id: number): Promise<Note | undefined>;
}