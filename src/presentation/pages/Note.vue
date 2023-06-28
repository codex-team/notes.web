<template>
  <div>
    Note id {{ note.id }}
  </div>
  <div>
    Note title: {{ note.title }}
  </div>
  <div>
    Note content: {{ note.content }}
  </div>
</template>

<script lang="ts" setup>
import useNote from "../../application/services/useNote";

const props = defineProps({
  id: Number,
});

const { note, getNote } = useNote();

getNote(props.id);
</script>

<style scoped>

</style>
