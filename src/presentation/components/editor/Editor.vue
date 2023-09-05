<template>
  <div
    id="editor"
    ref="holder"
  />

  <Suggest />
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import Editor, { API, OutputData } from '@editorjs/editorjs';
import useSuggestions from '@/application/services/useSuggestions';
import { useDebounceFn } from '@vueuse/core';
import Suggest from './Suggest.vue';
import { noteService } from '@/domain';


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

let editor;

let suggestData;

/**
 * Editor container element
 */
const holder = ref<HTMLElement | null>(null);

let textContainer = null;

let insertExpected = false;

// const pureText = computed(() => {
//   return textContainer?.innerText;
// });


onMounted(() => {
  editor = new Editor({
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

  editor.isReady.then(() => {
    textContainer = document.querySelector('.codex-editor__redactor');
    textContainer.addEventListener('keydown', onEditorKeydown);
    textContainer.addEventListener('blur', onEditorBlur);
  });

  // textContainer = document.querySelector('.codex-editor__redactor');
  // holder.value.addEventListener('keydown', onEditorKeydown);
});

/**
 * Handles editor input
 *
 * @param e
 */
function onEditorKeydown(e): void {
  // if (e.key === 'Tab') {
  //   e.preventDefault();

  //   insertText(suggestData, editor);
  // }
  hideSuggest();
  // suggestData = '';

  if (e.key === 'Tab' && insertExpected) {
    e.preventDefault();

    insertText(suggestData, editor);
  }
  insertExpected = false;
}

/**
 *
 */
function onEditorBlur() {
  console.log('blur');
  insertExpected = false;
}

/**
 * Handles editor change event
 *
 * @param api
 */
async function onChange(api: API): Promise<void> {
  // if (!textContainer.hasFocus()) {
  //   return;
  // }
  const stillFocused = document.activeElement.closest('.codex-editor__redactor') === textContainer;

  if (!stillFocused) {
    return;
  }
  const content = textContainer.innerText;

  // const data = await noteService.fetchSuggestions(content);
  const data = content;

  suggestData = data;
  await showSuggest(data);
  insertExpected = true;
}


/**
 * Inserts text into the editor
 *
 * @param text - text to insert
 * @param api - EditorJS api
 */
function insertText(text: string, api: API): void {
  const index = api.blocks.getCurrentBlockIndex();
  const block = api.blocks.getBlockByIndex(index);
  const contenteditable = block.holder;

  const data = { 'text/plain': ' ' + text };
  const pasteEvent = Object.assign(new Event('paste', {
    bubbles: true,
    cancelable: true,
  }), {
    clipboardData: {
      getData: (type): string => data[type],
      types: Object.keys(data),
    },
  });

  contenteditable.dispatchEvent(pasteEvent);
}

onUnmounted(() => {
  textContainer?.removeEventListener('keydown', onEditorKeydown);
});

</script>

<style lang="postcss">

</style>
