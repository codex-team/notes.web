<template>
  <div class="note">
    <div class="note-header">
      <h1 class="note-title">
        {{ props.note.content.blocks[0]?.data.text.substring(0,36) }}
      </h1>
      <p class="note-date">
        {{ new Date(props.note.createdAt).toLocaleDateString() }}
      </p>
    </div>
    <p class="note-sub">
      {{ props.note.content.blocks[1]?.data.text.substring(0,96) }}
    </p>
  </div>
</template>

<script  setup lang="ts">
import { Note } from '@/domain/entities/Note.ts';

/**
 * NoteView component props
 */
const props = defineProps<{
    note: Note}>();
console.log(props.note);
</script>

<style>
.note {
    margin: 20px 0px;
    padding-bottom: 20px;
    border-bottom: 1px solid #4b4b4b;
    cursor: pointer;
}

.note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.note-title {
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin: 0
}

.note-sub {
    margin-top: 4px;
    font-size: 16px;
    color: white;
    opacity: 0.5;
}
</style>
