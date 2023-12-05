<template>
  <div v-if="note === null">
    Loading...
  </div>
  <Editor
    v-else
    ref="editor"
    :content="note.content"
    :read-only="!canEdit"
    @change="noteChanged"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Editor from '@/presentation/components/editor/Editor.vue';
import useNote from '@/application/services/useNote';
import {  NoteContent } from '@/domain/entities/Note';
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { watchEffect } from 'vue';

const { t } = useI18n();

const props = defineProps<{
  /**
   * Null for new note, id for reading existing note
   */
  id: string | null;
}>();

const noteId = computed(() => props.id);

const { note, save, title, canEdit } = useNote({
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
    save(data);
  }
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
    if (title.value) {
      useHead({
        title: title.value,
      });
    }
  });
}
</script>

<style scoped>

</style>
