import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
/**
 *
 * @param updatedAt - the date the note was last updated
 * @returns the last updated time in a human-readable format
 */
export const formatShortDate = (updatedAt: string): string => {
  dayjs.extend(relativeTime);
  const formattedUpdatedAt = dayjs(updatedAt).to(dayjs());

  return formattedUpdatedAt;
};
