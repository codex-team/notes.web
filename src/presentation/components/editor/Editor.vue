<template>
  <div id="editorjs" />
</template>

<script setup lang="ts">
import { type OutputData } from '@editorjs/editorjs';
import { useEditor } from '@/application/services/useEditor';

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
}>();

const emit = defineEmits<{
  change: [data: OutputData];
}>();

const { isEmpty } = useEditor({
  id: 'editorjs',
  content: props.content,
  isReadOnly: props.readOnly,
  onChange: (data) => emit('change', data),
});

defineExpose({
  /**
   * Returns the isEmpty attribute
   */
  isEmpty() {
    return isEmpty.value;
  },
});
</script>

<style scoped></style>
