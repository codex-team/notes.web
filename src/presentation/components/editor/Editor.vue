<template>
  <div
    id="editor"
    ref="holder"
  />

  <Suggest />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Editor, { OutputData } from '@editorjs/editorjs';
import useSuggestions from '@/application/services/useSuggestions';
import { useDebounceFn } from '@vueuse/core';
import Suggest from './Suggest.vue';


/**
 * Block Tools for the Editor
 */
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

/**
 * Inline Tools for the Editor
 */
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';

/**
 * Define the props for the component
 */
const props = defineProps<{
  data?: OutputData,
}>();

const { show: showSuggest, hide: hideSuggest } = useSuggestions();

/**
 * Editor container element
 */
const holder = ref<HTMLElement | null>(null);

onMounted(() => {
  new Editor({
    /**
     * id of Element that should contain the Editor
     */
    holder: 'editor',

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
    data: props.data,
    onChange: useDebounceFn(onChange, 1000),

  });

  holder.value.addEventListener('keydown', onEditorKeydown);
});

/**
 * Handles editor input
 */
function onEditorKeydown(): void {
  hideSuggest();
}

/**
 * Handles editor change event
 */
async function onChange(): Promise<void> {
  const content = holder.value.innerText;

  await showSuggest(content);
}

onUnmounted(() => {
  holder.value?.removeEventListener('keydown', onEditorKeydown);
});

</script>

<style lang="postcss">

</style>
