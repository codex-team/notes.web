import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
/**
 * Formats the date in a human-readable format
 *
 * @param updatedAt - the date the note was last updated
 * @returns the last updated time
 */
export function formatShortDate(updatedAt: string): string {
  dayjs.extend(relativeTime);
  const formattedUpdatedAt = dayjs(updatedAt).fromNow();

  return formattedUpdatedAt;
}
