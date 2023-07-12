<template>
  <div id="editor"></div>
</template>

<script lang="ts">
import Editor from '@editorjs/editorjs';

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

export default {
  mounted() {
    const editor = new Editor({
      /**
       * Id of Element that should contain the Editor
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
    });
  },
  name: 'editor',
};
</script>

<style scoped>

</style>