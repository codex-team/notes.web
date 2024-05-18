import { type OutputData } from '@editorjs/editorjs';
import { useI18n } from 'vue-i18n';
/**
 * Get the title of the note
 * @param content - content of the note
 * @returns the title of the note
 */
export function getTitle(content: OutputData): string {
  const limitCharsForNoteTitle = 50;
  const firstNoteBlock = content.blocks[0];
  const { t } = useI18n();

  /**
   *  If the heading is empty, return 'Untitled'
   */
  if (firstNoteBlock.data.text == '') {
    return t('note.untitled');
  } else {
    return firstNoteBlock.data.text.slice(0, limitCharsForNoteTitle);
  }
}
