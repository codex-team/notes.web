<template>
  <div id="editor" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Editor, { OutputData } from '@editorjs/editorjs';

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
 * Define the props for thecomponent
 */
const props = defineProps<{
  data: OutputData,
}>();

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
      header: Header,
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
  });
});
</script>

<style scoped>
</style>
