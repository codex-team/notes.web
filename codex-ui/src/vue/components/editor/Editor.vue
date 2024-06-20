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
  onChange: data => emit('change', data),
});

defineExpose({
  /**
   * Returns the isEmpty attribute
   *
   * @returns {boolean}
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

<style lang="postcss">
@import '../../../styles/typography.pcss';

.ce-header {
  color: var(--base--text);
}

h1.ce-header {
  padding-bottom: 1.333rem;

  @apply --text-h1;
}

h2.ce-header {
  padding-top: 0.8rem;
  padding-bottom: 0.333rem;

  @apply --text-h2;
}

h3.ce-header {
  @apply --text-h3;
}

.ce-block {
  @apply --text-p;
}

.ce-toolbar__plus,
.ce-toolbar__settings-btn {
  color: var(--base--text);

  &:hover {
    background-color: var(--base--bg-secondary-hover);
  }
}

.cdx-block {
  padding: 0;
}

.codex-editor__redactor {
  gap: 0.4rem;
  display: flex;
  flex-direction: column;
}

.ce-paragraph {
  line-height: inherit !important;
}

/* @todo add h4-h6 styles */
</style>
