<template>
  <div id="editorjs" />
</template>

<script setup lang="ts">
import { type EditorConfig, type OutputData } from '@editorjs/editorjs';
import { useEditor } from './useEditor.js';

/**
 * Define the props for the component
 */
const props = defineProps<{
  /**
   * Editor content
   */
  content?: OutputData;
  /**
   * True if editor content is not editable
   */
  readOnly?: boolean;
  /**
   * Loaded user tools for Editor
   */
  tools?: EditorConfig['tools'];
}>();

const emit = defineEmits<{
  change: [data: OutputData];
}>();

const { isEmpty, refresh } = useEditor({
  id: 'editorjs',
  content: props.content,
  isReadOnly: props.readOnly,
  tools: props.tools ?? {},
  onChange: (data) => emit('change', data),
});

defineExpose({
  /**
   * Returns the isEmpty attribute
   */
  isEmpty() {
    return isEmpty.value;
  },

  /**
   * Reinitialize editor instance with new data
   */
  refresh,
});
</script>

<style scoped></style>
