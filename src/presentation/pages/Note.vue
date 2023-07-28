<template>
  <div v-if="note">
    <Editor :data="note.content" />
  </div>
  <div v-else-if="isLoading">
    Loading...
  </div>
  <div v-else>
    Note not found
  </div>
</template>

<script lang="ts" setup>
import Editor from '@/presentation/components/Editor/Editor.vue';
import useNote from '@/application/services/useNote';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const { note, load, isLoading } = useNote();

load(props.id);
</script>

<style scoped>

</style>
