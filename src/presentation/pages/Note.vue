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

<script lang="ts">
import NoteService from "../../domain/note.service";
import useNote from "../../application/services/useNote";

export default {
  name: 'Note',
  props: {
    noteService: {
      type: NoteService,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { note, getNote } = useNote(props.noteService);

    getNote(props.id);

    return {
      note,
      getNote,
    }
  }
}
</script>

<style scoped>

</style>