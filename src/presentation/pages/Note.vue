<template>
  <div v-if="note">
    <div>
      Note id {{ note.id }}
    </div>
    <div>
      Note title: {{ note.title }}
    </div>
    <div>
      Note content: {{ note.content }}
    </div>
  </div>
  <div v-else>
    Note not found
  </div>
</template>

<script lang="ts" setup>
import useNote from "@/application/services/useNote";

const props = defineProps({
  id: Number,
});

const {note, load} = useNote();

load(props.id);
</script>

<style scoped>

</style>
