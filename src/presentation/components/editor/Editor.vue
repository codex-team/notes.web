<template>
  <div id="editorjs" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Editor, { type OutputData, type API } from '@editorjs/editorjs';

// @ts-expect-error: we need to rewrite plugins to TS to get their types
import Header from '@editorjs/header';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Image from '@editorjs/image';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import CodeTool from '@editorjs/code';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import List from '@editorjs/list';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Delimiter from '@editorjs/delimiter';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Table from '@editorjs/table';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Warning from '@editorjs/warning';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Checklist from '@editorjs/checklist';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import LinkTool from '@editorjs/link';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import RawTool from '@editorjs/raw';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Embed from '@editorjs/embed';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import InlineCode from '@editorjs/inline-code';
// // @ts-expect-error: we need to rewrite plugins to TS to get their types
// import Marker from '@editorjs/marker';

import EditorTool from '@/domain/entities/EditorTool';
import { useAppState } from '@/application/services/useAppState';


const { userEditorTools } = useAppState();


/**
 * Load one tool at a time
 *
 * @param src - source path to tool
 */
function loadScript(src: string) {
  return new Promise(function (resolve, reject) {
    const editorToolScript = document.createElement('script');

    editorToolScript.src = src;
    editorToolScript.onload = resolve;
    editorToolScript.onerror = reject;
    document.head.appendChild(editorToolScript);
  });
}

/**
 * Define the props for the component
 */
const props = defineProps<{
  content?: OutputData,
  readOnly?: boolean,
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

const isEditorMounted = ref(false);

const mountEditorOnce = async () => {
  console.log('mount');
  isEditorMounted.value = true;

  Promise.allSettled(userEditorTools.value.map((spec: EditorTool) => {
    if (!spec.source.cdn) {
      return;
    }

    return loadScript(spec.source.cdn);
  })).then(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadedTools: {[key: string]: any } = userEditorTools.value.reduce(
      (acc, spec: EditorTool) => {
      // @ts-expect-error: we need to rewrite plugins to TS to get their types
        const windowPlugin = window[spec.exportName];

        return {
          ...acc,
          [spec.title]: windowPlugin,
        };
      },
      {}
    );


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
        // image: Image,
        // code: CodeTool,
        // list: List,
        // delimiter: Delimiter,
        // table: Table,
        // warning: Warning,
        // checklist: Checklist,
        // linkTool: LinkTool,
        // raw: RawTool,
        // embed: Embed,

        // /**
        //  * Inline Tools
        //  */
        // inlineCode: InlineCode,
        // marker: Marker,
        ...loadedTools,
      },
      data: props.content,
      onChange,
      readOnly: props.readOnly,
    });

    await editorInstance.isReady;

    editor.value = editorInstance;
  });
};

watch(userEditorTools, mountEditorOnce);
onMounted(() => {
  console.log('mount', userEditorTools.value);
  mountEditorOnce();
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

<style scoped></style>
