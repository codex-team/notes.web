import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
/**
 * Returns time, that has been passed from updated at timestamp
 * @param updatedAt - the date the note was last updated
 * @returns the last updated time
 */
export function getTimeFromNow(updatedAt: string): string {
  dayjs.extend(relativeTime);
  const formattedUpdatedAt = dayjs(updatedAt).fromNow();

  return formattedUpdatedAt;
}

/**
 * Converts timestamp to readable time format
 * @param date - date instance from timestamp
 * @returns - string with formatted date and time
 */
export function parseDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}
