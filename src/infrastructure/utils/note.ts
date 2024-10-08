import { type OutputData } from '@editorjs/editorjs';
/**
 * Get the title of the note
 * @param content - content of the note
 * @returns the title of the note
 */
export function getTitle(content: OutputData | undefined): string {
  const limitCharsForNoteTitle = 50;
  const firstNoteBlock = content?.blocks[0];

  const text: string | undefined = firstNoteBlock?.data.text;

  /**
   *  If the heading is empty, return 'Untitled'
   */
  if (text === undefined || text.trim() === '') {
    return 'Untitled';
  } else {
    return text?.replace(/&nbsp;/g, ' ')?.slice?.(0, limitCharsForNoteTitle);
  }
}

/**
 * Extracts the note ID from the URL
 * @param url - URL of the note
 * @returns note ID
 */
export function extractNoteId(url: string): string {
  /**
   * Regex matches any characters between '/note/' and the next slash or end of string
   */
  const regex = /\/note\/([^/]+)/;

  const matches = url.match(regex);

  if (matches === null) {
    throw new Error('Invalid URL');
  }

  /**
   * Extracts the ID from the URL. The ID is matches[1] as matches[0] is the full match
   */
  const noteId = matches[1];

  const noteIdPattern = /^[a-zA-Z0-9-_]{10}$/;

  if (!noteIdPattern.test(noteId)) {
    throw new Error('Invalid note ID');
  }

  return noteId;
}
