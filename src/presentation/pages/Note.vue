<template>
  <div>
    <NoteHeader :id="props.id" />
    <div v-if="note === null">
      Loading...
    </div>
    <div v-else>
      <Editor
        v-if="isToolsLoaded"
        ref="editor"
        :tools="loadedTools"
        :content="note.content"
        :read-only="!canEdit"
        @change="noteChanged"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch, computed } from 'vue';
import { Editor } from 'codex-ui/vue';
import useNote from '@/application/services/useNote';
import { NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useLoadedTools } from '@/application/services/useLoadedTools.ts';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';

const { t } = useI18n();

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

const { loadedTools } = useLoadedTools(noteTools);

/**
 * Check if tools are loaded and if they are not empty
 * Means we can render the editor
 */
const isToolsLoaded = computed(() => loadedTools.value ? Object.keys(loadedTools.value).length > 0 : false);

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

watch(
  () => props.id,
  () => {
    /** If new child note is created, refresh editor with empty data */
    if (props.id === null) {
      editor.value?.refresh();

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
