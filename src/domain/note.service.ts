import type NoteRepository from '@/domain/note.repository.interface';
import type { Note, NoteContent, NoteId } from '@/domain/entities/Note';
import type NoteAccessRights from '@/domain/entities/NoteAccessRights';
import type { NoteDTO } from './entities/NoteDTO';
import type { NoteTool } from '@/domain/entities/Note';

/**
 * Note Service
 */
export default class NoteService {
  /**
   * Note repository
   */
  private readonly noteRepository: NoteRepository;

  /**
   * Note Service constructor
   * @param noteRepository - Note repository instance
   */
  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  /**
   * Returns a note and accessRights by its id
   * @param id - Note identifier
   * @throws NotFoundError
   * @returns - note data, accessRights data
   * and parent note data if exists
   */
  public async getNoteById(id: string): Promise<NoteDTO> {
    return await this.noteRepository.getNoteById(id);
  }

  /**
   * Get note and accessRights by hostname
   * @param hostname - Custom hostname linked with a note
   * @returns - note data and accessRights data
   */
  public async getNoteByHostname(hostname: string): Promise<{ note: Note; accessRights: NoteAccessRights }> {
    return await this.noteRepository.getNoteByHostname(hostname);
  }

  /**
   * Creates a new note and returns it
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in the note
   * @param parentId - Id of the parent note. If omitted, then it's a root note
   */
  public async createNote(content: NoteContent, noteTools: NoteTool[], parentId?: NoteId): Promise<Note> {
    return await this.noteRepository.createNote(content, noteTools, parentId);
  }

  /**
   * Updates a content of existing note
   * @param id - identifier of the note to update
   * @param content - Note content (Editor.js data)
   * @param noteTools - Tools that are used in the note
   */
  public async updateNoteContentAndTools(id: string, content: NoteContent, noteTools: NoteTool[]): Promise<void> {
    return await this.noteRepository.updateNoteContentAndTools(id, content, noteTools);
  }

  /**
   * Unlink note from parent
   * @param id - Note identifier
   */
  public async unlinkParent(id: NoteId): Promise<void> {
    return await this.noteRepository.unlinkParent(id);
  }

  /**
   * Set new parent for the note
   * @param id - Note id
   * @param parentURL - link to the new parent note
   */
  public async setParent(id: NoteId, parentURL: string): Promise<void> {
    // Regex matches any characters between '/note/' and the next slash or end of string
    const regex = /\/note\/([^/]+)/;

    const matches = parentURL.match(regex);

    if (matches === null) {
      throw new Error('Invalid parent URL');
    }

    // Extracts the ID from the URL. The ID is matches[1] as matches[0] is the full match
    const parentId = matches[1];

    const noteIdPattern = /^[a-zA-Z0-9-_]{10}$/;

    if (!noteIdPattern.test(parentId)) {
      throw new Error('Invalid parent ID');
    }

    const isUpdated = await this.noteRepository.setParent(id, parentId);

    if (!isUpdated) {
      throw new Error('Parent was not updated');
    }
  }
}
