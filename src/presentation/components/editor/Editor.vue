<template>
  <div id="editorjs" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { type OutputData, type API } from '@editorjs/editorjs';
import { useEditor } from '@/application/services/useEditor2';

/**
 * Define the props for the component
 */
const props = defineProps<{
  content?: OutputData;
  readOnly?: boolean;
}>();

const emit = defineEmits<{
  change: [data: OutputData];
}>();

/**
 * Attribute containing is-empty state.
 * It is updated on every change of the editor
 */
const isEmpty = ref(true);

/**
 * Checks if the editor is empty
 * Uses EditorJS API:
 *  - blocks.getById()
 *  - block.isEmpty()
 *
 * @todo implement "isEmpty" method in the EditorJS API
 *
 * @param data - saved data
 * @param api - EditorJS API
 */
function checkIsEmpty(data: OutputData, api: API): boolean {
  const blockIds = data.blocks.map((block) => block.id);

  return blockIds.reduce((acc, id) => {
    if (id === undefined) {
      return acc;
    }

    const block = api.blocks.getById(id);

    if (block) {
      return acc && block.isEmpty;
    }

    return acc;
  }, true);
}

/**
 * Function called on every change of the editor
 *
 * @param api - EditorJS API
 */
async function onChange(api: API): Promise<void> {
  const data = await api.saver.save();

  /**
   * Update the isEmpty attribute
   */
  isEmpty.value = checkIsEmpty(data, api);

  /**
   * Change model value
   */
  emit('change', data);
}

useEditor({
  id: 'editorjs',
  content: props.content,
  isReadOnly: props.readOnly,
  onChange,
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
