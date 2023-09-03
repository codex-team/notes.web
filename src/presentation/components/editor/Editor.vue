<template>
  <div id="editorjs" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Editor, { type OutputData, type API } from '@editorjs/editorjs';


import Header from '@editorjs/header';
import Image from '@editorjs/image';
import CodeTool from '@editorjs/code';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';


/**
 * Define the props for the component
 */
const props = defineProps<{
  content?: OutputData,
}>();

const emit = defineEmits<{
  'change': [data: OutputData],
}>();

/**
 * Editor.js instance
 */
const editor = ref<Editor | undefined>(undefined);

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

onMounted(async () => {
  const editorInstance = new Editor({
    /**
     * Block Tools
     */
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: 'Title...',
        },
      },
      image: Image,
      code: CodeTool,
      list: List,
      delimiter: Delimiter,
      table: Table,
      warning: Warning,
      checklist: Checklist,
      linkTool: LinkTool,
      raw: RawTool,
      embed: Embed,

      /**
       * Inline Tools
       */
      inlineCode: InlineCode,
      marker: Marker,
    },
    data: props.content,
    onChange,
  });

  await editorInstance.isReady;

  editor.value = editorInstance;
});

watch(() => props.content, (content) => {
  if (content === undefined) {
    editor.value?.clear();

    return;
  }

  if (editor.value) {
    editor.value.render(content);
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
  editor.value = undefined;
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

<style scoped>
</style>
