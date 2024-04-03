import { type OutputData } from '@editorjs/editorjs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
/**
 * Get the title of the note
 *
 * @param content - content of the note
 * @returns the title of the note
 */
export const getTitle = (content: OutputData): string => {
  const limitCharsForNoteTitle = 50;
  const firstNoteBlock = content.blocks[0];

  /**
   *  If the heading is empty, return 'Untitled'
   */
  if (firstNoteBlock.data.text == '') {
    return 'Untitled';
  } else {
    return firstNoteBlock.data.text.slice(0, limitCharsForNoteTitle);
  }
};

/**
 *
 * @param updatedAt - the date the note was last updated
 * @returns the last updated time in a human-readable format
 */
export const getUpdateTime = (updatedAt: string): string => {
  dayjs.extend(relativeTime);
  const formattedUpdatedAt = dayjs(updatedAt).to(dayjs());

  return formattedUpdatedAt;
};
