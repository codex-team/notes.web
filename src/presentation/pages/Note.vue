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
import useNote from '../../application/services/useNote';
import Editor from '../components/Editor/Editor.vue';

const props = defineProps({
  id: Number,
});

const {note, load, isLoading} = useNote();

load(props.id);
</script>

<style scoped>

</style>
