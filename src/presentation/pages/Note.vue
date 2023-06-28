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
import NoteService from "../../domain/note.service";
import useNote from "../../application/services/useNote";

const props = defineProps({
  noteService: NoteService,
  id: Number,
});

const { note, getNote } = useNote(props.noteService);

getNote(props.id);
</script>

<style scoped>

</style>
