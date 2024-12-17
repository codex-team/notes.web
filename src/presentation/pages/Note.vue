<template>
  <div>
    <NoteHeader
      :style="{ '--opacity': id && note ? 1 : 0 }"
    >
      <template #left>
        <div>
          <RouterLink
            v-for="(parent, index) in displayedParents"
            :key="index"
            :to="{ path: `/note/${parent.id ? parent.id : noteId}` }"
            @click.prevent="handleParentClick($event, parent)"
          >
            {{ getTitle(parent.content) }}
            <span v-if="index < displayedParents.length - 1"> > </span>
          </RouterLink>
        </div>
      </template>
      <template #right>
        <Button
          v-if="canEdit"
          secondary
          icon="Plus"
          @click="createChildNote"
        />
        <!-- @todo add icon history to the button, it will be availible since codex icons 2.0 -->
        <Button
          v-if="canEdit"
          secondary
          @click="router.push(`/note/${noteId}/history`)"
        >
          History
        </Button>
        <Button
          v-if="canEdit"
          secondary
          icon="EtcHorisontal"
          @click="redirectToNoteSettings"
        />
      </template>
    </NoteHeader>
    <div v-if="note === null">
      Loading...
    </div>
    <div v-else>
      <Editor
        v-if="isEditorReady"
        ref="editor"
        v-bind="editorConfig"
        @change="noteChanged"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, watch } from 'vue';
import { OutputData } from '@editorjs/editorjs';
import { Button, Editor } from 'codex-ui/vue';
import useNote from '@/application/services/useNote';
import { RouterLink, useRouter } from 'vue-router';
import { Note, NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { makeElementScreenshot } from '@/infrastructure/utils/screenshot';
import useNoteSettings from '@/application/services/useNoteSettings';
import { useNoteEditor } from '@/application/services/useNoteEditor';
import NoteHeader from '@/presentation/components/note-header/NoteHeader.vue';
import { getTitle } from '@/infrastructure/utils/note';

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

const { note, noteTools, save, noteTitle, canEdit, noteParents } = useNote({
  id: noteId,
});

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
 * Move to note settings
 */
function redirectToNoteSettings(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/settings`);
}

/**
 * Navigate to a specific note
 *
 * @param {number} parentId - The ID of the parent note to navigate to
 */
function navigateToParent(parentId: string): void {
  router.push(`/note/${parentId}`);
}

/**
 * Handle parent click
 *
 * @param {Event} event - The click event
 * @param {object} parent - The parent object
 * @param {string} parent.id - The ID of the parent note
 */
function handleParentClick(event: Event, parent: Note): void {
  if (getTitle(parent.content) !== '...') {
    navigateToParent(parent.id);
  } else {
    event.preventDefault();
  }
}

/**
 * Displayed parents
 */
const displayedParents = computed(() => {
  if (noteParents.value.length > 3) {
    const newNoteContent = { blocks: [] } as OutputData;

    newNoteContent.blocks.push({ type: 'paraghraph',
      data: { text: '...' } });

    return [
      noteParents.value[0],
      { id: '',
        content: newNoteContent },
      noteParents.value[noteParents.value.length - 1],
    ];
  }

  return noteParents.value;
});

const { updateCover } = useNoteSettings();

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools,
  isDraftResolver: () => noteId.value === null,
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
  const editorElement = editor.value ? editor.value.element : null;

  if (!isEmpty) {
    await save(data, props.parentId);
    /**
     * In case if we do not have note id, we can change its cover, and we need successful data for cover
     * We need to do it after saving in case of note creation
     */
    if (editorElement !== null) {
      updatedNoteCover = await makeElementScreenshot(editorElement, {
        background: 'var(--base--bg-primary)',
        color: 'var(--base--text)',
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
