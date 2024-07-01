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

      <Button
        v-if="parentNote != undefined"
        @click="unlinkButton"
      >
        {{ t('note.unlink') }}
      </Button>
    </div>
    <Editor
      v-if="isToolsLoaded"
      ref="editor"
      :tools="loadedTools"
      :content="note.content"
      :read-only="!canEdit"
      @change="noteChanged"
    />
    <div id="note-clone" />
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
import { useLoadedTools } from '@/application/services/useLoadedTools.ts';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';

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

const { note, noteTools, save, noteTitle, canEdit, unlinkParent, parentNote } = useNote({
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

  /**
   * If it does not exist, we can not do screenshot
   */
  if (editorElement !== null) {
    /**
     * Screenshot height
     */
    const clonedEditorNode = editorElement.cloneNode(true);

    /**
     * Insert cloned note to element, which will be screenshoted
     */
    document.getElementById('note-clone')?.appendChild(clonedEditorNode);

    updatedNoteCover = await makeElementScreenshot('note-clone');
    /**
     * Remove copied note from the div for screenshots
     */
    document.getElementById('note-clone')?.removeChild(clonedEditorNode);
  }

  if (!isEmpty) {
    await save(data, props.parentId);
    /**
     * In case if we do not have note id, we can change its cover, and we need successful data for cover
     * We need to do it after saving in case of note creation
     */
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

/**
 * Unlink note from parent
 */
function unlinkButton(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }

  unlinkParent();
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
#note-clone {
  background: var(--base--bg-primary);
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 700px;
  height: 900px;
}
</style>
