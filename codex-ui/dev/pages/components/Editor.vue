<template>
  <PageHeader>
    Editor
    <template #description>
      Component for creating a rich text content using Editor.js
    </template>
  </PageHeader>

  <Editor
    :class="$style.editorjs"
    :tools="{
      header: {
        class: Header,
        config: {
          placeholder: 'Untitled',
        },
      }
    }"
    :content="{
      blocks: [
        {
          type: 'header',
          data: {
            text: '',
            level: 2,
          },
        },
      ],
    }"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Editor } from '../../../src/vue';
// ts-expect-error - no types for Editor.js tools
import Header from '@editorjs/header';

/**
 * @todo make placeholder visible on focus
 */
</script>

<style module>
@import '../../../src/styles/typography.pcss';

.editorjs {
  :global(.ce-header[contentEditable=true][data-placeholder]:before) {
    font-weight: inherit;
    font-size: inherit;
    color: var(--base--text-secondary);
  }
  :global(h2.ce-header) {
    @apply --text-h2;
  }
}
</style>
