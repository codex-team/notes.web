import { nanoid } from 'nanoid';

/**
 * Generate random hash string
 *
 * @param length - hash string length
 * @returns generated hash string with passed length (10 by default)
 */
export default function generateHash(length = 10): string {
  return nanoid(length)
}
