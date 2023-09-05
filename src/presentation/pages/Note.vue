<template>
  <Editor
    :data="editorData"
  />
  <div v-if="id && isLoading">
    Loading...
  </div>
  <div v-if="id && !note">
    Note not found
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import Editor from '@/presentation/components/editor/Editor.vue';
import useNote from '@/application/services/useNote';

const props = defineProps<{
  /**
   * Null for new note, id for reading existing note
   */
  id: string | null;
}>();

const { note, load, isLoading } = useNote();

onMounted(() => {
  /**
   * If we have id, load note
   */
  if (props.id !== null) {
    load(props.id);
  }
});

/**
 * Data will be used to create new note
 */
const defaultData = {
  blocks: [
    {
      type: 'header',
      data: {
        level: 1,
        text: '',
      },
    },
    {
      type: 'paragraph',
      data: {
        text: '',
      },
    },
  ],
};

/**
 * Data do display in the editor
 */
const editorData = computed(() => {
  if (!note.value) {
    return defaultData;
  }

  return note.value.content;
});
</script>

<style scoped>

</style>
