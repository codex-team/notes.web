<template>
  <div
    ref="editorComponent"
    class="editorjs"
    :class="{
      'editorjs--with-initial-placeholder': props.firstBlockPlaceholder,
    }"
  />
</template>

<script setup lang="ts">
import { type EditorConfig, type OutputData } from '@editorjs/editorjs';
import { useEditor } from './useEditor.js';
import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue';

const editorComponent = ref<HTMLElement | null>(null);

/**
 * Define the props for the component
 */
const props = defineProps<{
  /**
   * Editor content
   */
  data?: MaybeRefOrGetter<OutputData>;
  /**
   * True if editor content is not editable
   */
  readOnly?: boolean;
  /**
   * Loaded user tools for Editor
   */
  tools?: EditorConfig['tools'];

  /**
   * Hint for the all paragraph blocks
   * Will be displayed near focused paragraph
   */
  placeholder?: string;

  /**
   * Hint for the first block.
   * Useful for settings a Title placeholder
   */
  firstBlockPlaceholder?: string;

  /**
   * Should the editor be focused on load
   */
  autofocus?: boolean;
}>();

const emit = defineEmits<{
  change: [data: OutputData];
}>();

const editorConfig = computed<EditorConfig>(() => {
  return {
    holder: editorComponent.value as HTMLElement,
    data: toValue(props.data),
    readOnly: props.readOnly,
    tools: props.tools,
    placeholder: props.placeholder,
    autofocus: props.autofocus,
  };
});

const { isEmpty } = useEditor(editorConfig, {
  onChange: data => emit('change', data),
});

defineExpose({
  /**
   * Returns the isEmpty attribute
   */
  isEmpty(): boolean {
    return isEmpty.value;
  },

  /**
   * Returns the editor holder
   */
  element: editorComponent.value,
});
</script>

<style>
@import '../../../styles/typography.pcss';

.editorjs {
  &--with-initial-placeholder {
    .ce-block:first-of-type [data-placeholder]:empty:before,
    .ce-block:first-of-type [data-placeholder][data-empty=true]:before {
      content: v-bind(`'${props.firstBlockPlaceholder}'`);
    }
  }

  [data-placeholder]:empty:before,
  [data-placeholder][data-empty=true]:before,
  [data-placeholder-active]:empty:before,
  [data-placeholder-active][data-empty="true"]:before{
    color: var(--base--text-secondary);
  }

  .ce-toolbar__plus,
  .ce-toolbar__settings-btn {
    color: var(--base--text);

    &:hover {
      background-color: var(--base--bg-secondary-hover);
    }
  }

  .ce-popover__container {
    background-color: var(--base--bg-secondary);
    color: var(--base--text);
    border-color: var(--base--border);
    border-radius: var(--radius-m);
    box-shadow: 0 3px 15px -3px rgb(13 20 33 / 0%);
  }

  .ce-popover-item {
    color: var(--base--text);
    padding: var(--v-padding) var(--h-padding);
  }

  .ce-popover-item__icon {
    width: var(--size-icon);
    height: var(--size-icon);
  }

  .ce-popover:not(.ce-popover--inline) .ce-popover-item__icon--tool {
    margin-right: var(--v-padding);
  }

  .ce-popover-item:hover:not(.ce-popover-item--no-hover) {
    background-color: var(--base--bg-secondary-hover);
  }

  .ce-popover-item--focused:not(.ce-popover-item--no-focus),
  .ce-popover-item--active {
    background-color: var(--base--bg-secondary-hover) !important;
  }

  .ce-popover:not(.ce-popover--inline) .ce-popover-item--active {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 4px;
      left: 0;
      top: 8px;
      bottom: 8px;
      border-radius: 6px;
      background-color: var(--accent--solid);
    }
  }

  .cdx-search-field,
  .ce-inline-tool-input {
    background-color: var(--base--bg-secondary);
    border: 0;
    color: var(--base--text);

    &::placeholder,
    &__icon svg {
      color: var(--base--text-secondary);
    }
  }

  .ce-popover__search {
    margin-bottom: 0;
  }

  .cdx-search-field {
    padding: var(--v-padding) var(--h-padding);

    &__icon {
      width: var(--size-icon);
      height: var(--size-icon);
    }
  }
  .cdx-search-field__input {
    color: var(--base--text);

    &::placeholder {
      color: var(--base--text-secondary);
    }
  }

  .ce-popover__nothing-found-message {
    color: var(--base--text-secondary);
  }

  .ce-popover-item-separator__line {
    background-color: var(--base--border);
  }

  .ce-inline-tool:hover {
    background-color: var(--base--bg-secondary-hover);
  }

  .ce-inline-tool svg {
    color: var(--base--text);
  }

  .ce-block a {
    color: var(--base--text);
  }

  .ce-block--selected .ce-block__content,
  ::selection {
    background-color: var(--accent--solid-secondary);
  }

  mark,
  .ce-stub {
    background-color: var(--base--bg-secondary);
    color: var(--base--text);
    border: 0;
  }

  .ce-stub__subtitle {
    color: var(--base--text-secondary);
  }

  .ce-paragraph,
  .cdx-nested-list__item,
  .cdx-list__item {
    line-height: inherit;
  }

  .cdx-nested-list,
  .cdx-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .cdx-nested-list__item {
    margin: 0;
  }

  .cdx-list {
    padding-left: calc(var(--spacing-l) + var(--spacing-xxs));

    &__item {
      padding: 0;
      padding-left: var(--spacing-very-x);
    }
  }

  /**
   * Remove after updating Header tool
   */
  .ce-header[contentEditable=true][data-placeholder]:before {
    position: static;
    color: var(--base--text-secondary);
    font-weight: inherit;
  }

  .ce-header[contentEditable=true][data-placeholder]:empty:focus::before {
    display: inline;
  }
}

[color-scheme="dark"] {
  & .ce-block--selected .ce-block__content,
  & ::selection {
    background-color: var(--accent--solid);
  }
}

/**
 * CodeX Tooltips
 */
.ct {
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.05);
}
.ct__content {
  color: var(--base--text);
}
.ce-hint__description {
  opacity: 1;
  color: var(--base--text-secondary);
}
.ct:before,
.ct:after {
  background-color: var(--base--bg-secondary);
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

.cdx-block {
  padding: 0;
}

.codex-editor__redactor {
  gap: 0.533rem;
  display: flex;
  flex-direction: column;
}

/* @todo add h4-h6 styles */
</style>
