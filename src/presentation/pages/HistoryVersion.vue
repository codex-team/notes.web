<template>
  Privet
  {{ historyContent }}
  {{ historyId }}
  <Editor
    v-if="isEditorReady"
    ref="editor"
    v-bind="editorConfig"
  />
</template>

<script lang="ts" setup>
import { ref, toRef, watch } from 'vue';
import { until } from '@vueuse/core';
import { Editor } from 'codex-ui/vue';
import useHistory from '@/application/services/useNoteHistory';
import { useNoteEditor } from '@/application/services/useNoteEditor';

const props = defineProps<{
  noteId: string;
  historyId: number;
}>();

const noteId = toRef(props, 'noteId');
const historyId = toRef(props, 'historyId');

const { historyContent, historyTools } = useHistory({
  noteId: noteId,
  historyId: historyId,
});

const canEdit = ref(false);

watch(historyContent, async (c) => {
  console.log('new content', c);
  await until(c).not.toBe(undefined);
  console.log('new content awaited', c);
}, {
  immediate: true,
});

const { isEditorReady, editorConfig } = useNoteEditor({
  noteTools: historyTools,
  isDraftResolver: () => noteId.value === null,
  noteContentResolver: () => historyContent.value,
  canEdit,
});

console.log('editor used', historyContent.value);

</script>

<style scoped>
</style>
