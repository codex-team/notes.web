<template>
  <div v-if="note === null">Loading...</div>
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
      v-if="tools !== undefined"
      ref="editor"
      :tools="tools"
      :content="note.content"
      :read-only="!canEdit"
      @change="noteChanged"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { Button, Editor } from 'codex-ui/vue';
import useNote from '@/application/services/useNote';
import { useTools } from '@/application/services/useTools.ts';
import { useRouter } from 'vue-router';
import { NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';

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

const { tools } = useTools(noteTools);

/**
 * Editor component reference
 */
const editor = ref<typeof Editor | undefined>(undefined);

/**
 * Callback for editor change. Saves the note
 *
 * @param data - editor data
 */
function noteChanged(data: NoteContent): void {
  const isEmpty = editor.value?.isEmpty();

  if (!isEmpty) {
    save(data, props.parentId);
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

<style scoped></style>
@/application/services/useTools
