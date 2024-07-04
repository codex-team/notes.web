<template>
  <div v-if="note === null">
    Loading...
  </div>
  <div v-else>
    <div>
      <Button
        v-if="props.id != null"
        @click="createChildNote"
      >
        {{ t('note.createChildNote') }}
      </Button>
    </div>
    <Editor
      v-if="isEditorReady"
      ref="editor"
      v-bind="editorConfig"
      @change="noteChanged"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch, computed } from 'vue';
import { Button, Editor } from 'codex-ui/vue';
import useNote from '@/application/services/useNote';
import { useRouter } from 'vue-router';
import { NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useNoteEditor } from '@/application/services/useNoteEditor';

const { t } = useI18n();

const router = useRouter();

const props = defineProps<{
  /**
   * Null for new note, id for reading existing note
   */
  id: string | null;

  /**
   * Parent note id, undefined for root note
   */
  parentId?: string;
}>();

const noteId = toRef(props, 'id');

const { note, noteTools, save, noteTitle, canEdit } = useNote({
  id: noteId,
});

const { updateCover } = useNoteSettings();

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools,
  isDraftResolver: () => noteId.value == null,
  noteContentResolver: () => note.value?.content,
  canEdit,
});

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

/**
 * Callback for editor change. Saves the note
 *
 * @param data - editor data
 */
async function noteChanged(data: NoteContent): Promise<void> {
  const isEmpty = editor.value?.isEmpty();

  let updatedNoteCover: Blob | null = null;

  /**
   * Get html element with note
   */
  const editorElement = document.getElementById('editorjs');

  if (!isEmpty) {
    await save(data, props.parentId);
    /**
     * In case if we do not have note id, we can change its cover, and we need successful data for cover
     * We need to do it after saving in case of note creation
     */
    if (editorElement !== null) {
      updatedNoteCover = await makeElementScreenshot(editorElement, {
        background: 'var(--base--bg-primary)',
        display: 'flex',
        justifyContent: 'center',
        width: '1200px',
        height: '900px',
        paddingTop: '100px',
      });
    }
    if (updatedNoteCover !== null && props.id !== null) {
      updateCover(props.id, updatedNoteCover);
    }
  }
}

/**
 * Create new child note
 */
function createChildNote(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/new`);
}

watch(
  () => props.id,
  () => {
    /** If new child note is created, refresh editor with empty data */
    if (props.id === null) {
      useHead({
        title: t('note.new'),
      });
    }
  },
  { immediate: true }
);

watch(noteTitle, () => {
  if (props.id !== null) {
    useHead({
      title: noteTitle.value,
    });
  }
});
</script>

<style scoped>
</style>
