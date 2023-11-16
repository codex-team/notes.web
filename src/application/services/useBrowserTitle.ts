/**
 * Limit Title length to 50 char
 *
 * @param title - string to be reduced
 */
export default function limitTitle(title: string): string {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (title.length <= 50) {
    return title;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return title.slice(0, 50);
  }
}
