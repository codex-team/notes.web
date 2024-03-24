import { type OutputData } from '@editorjs/editorjs';

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
  const noteUpdatedAt = new Date(String(updatedAt));

  const currentDate = new Date();

  const secondDiff = 1000;
  const minuteDiff = 60;
  const hourDiff = 60;
  const day = 24;
  const dayDiff = 86400000;
  const weekDiff = 7;
  const monthDiff = 30;
  const yearDiff = 365;

  const timeDifference = currentDate.getTime() - noteUpdatedAt.getTime();
  const secondsDifference = Math.floor(timeDifference / secondDiff);
  const minutesDifference = Math.floor(secondsDifference / minuteDiff);
  const hoursDifference = Math.floor(minutesDifference / hourDiff);
  const daysDifference = Math.floor(timeDifference / dayDiff);
  const weeksDifference = Math.floor(daysDifference / weekDiff);
  const monthsDifference = Math.floor(daysDifference / monthDiff);
  const yearsDifference = Math.floor(daysDifference / yearDiff);
  let formattedUpdatedAt: string;

  /**
   * Check the last updated time and display the appropriate message
   */
  if (secondsDifference < minuteDiff) {
    formattedUpdatedAt = 'Just now';
  } else if (minutesDifference < minuteDiff) {
    formattedUpdatedAt = `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hoursDifference < day) {
    formattedUpdatedAt = `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
  } else if (daysDifference < weekDiff) {
    formattedUpdatedAt = `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
  } else if (daysDifference < monthDiff) {
    formattedUpdatedAt = `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
  } else if (daysDifference < yearDiff) {
    formattedUpdatedAt = `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
  } else {
    formattedUpdatedAt = `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
  }

  return formattedUpdatedAt;
};
