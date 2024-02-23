<template>
  <div v-if="note === null">
    Loading...
  </div>
  <div v-else>
    <div class="control__button">
      <Button
        class="header__plus"
        text="createChildNote"
        @click.passive="createChildNote"
      />
    </div>
    <Editor
      ref="editor"
      :content="note.content"
      :read-only="!canEdit"
      @change="noteChanged"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Button } from 'codex-ui/vue';
import Editor from '@/presentation/components/editor/Editor.vue';
import useNote from '@/application/services/useNote';
import { useRouter } from 'vue-router';
import {  NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { watchEffect } from 'vue';

const { t } = useI18n();

const router = useRouter();

const props = defineProps<{
  /**
   * Null for new note, id for reading existing note
   */
  id: string | null;

  parentId: string | null;
}>();

const noteId = computed(() => props.id);

const { note, save, noteTitle, canEdit } = useNote({
  id: noteId,
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
 * Changing the title in the browser
 */
if (!props.id) {
  useHead({
    title: t('note.new'),
  });
} else {
  watchEffect(() => {
    if (noteTitle.value) {
      useHead({
        title: noteTitle.value,
      });
    }
  });
}
</script>

<style scoped>

</style>
