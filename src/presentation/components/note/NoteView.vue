<template>
  <div class="note">
    <div class="note-header">
      <h1 class="note-title">
        {{ noteTitle }}
      </h1>
      <p class="note-date">
        {{ new Date(props.note.createdAt).toLocaleDateString() }}
      </p>
    </div>
    <p class="note-sub">
      {{ noteSubTitle }}
    </p>
  </div>
</template>

<script  setup lang="ts">
import { Note } from '@/domain/entities/Note.ts';
import { computed } from 'vue';

/**
 * NoteView component props
 */
const props = defineProps<{
    note: Note}>();

const limitCharsForNoteTitle = 50;
const limitCharsForNoteSubTitle = 96;

const noteTitle = computed(() => {
  const firstNoteBlock = props.note.content.blocks[0];

  if (!firstNoteBlock || !(Boolean(firstNoteBlock.data.text))) {
    return 'Note';
  } else {
    return firstNoteBlock.data.text.slice(0, limitCharsForNoteTitle);
  }
});

const noteSubTitle = computed(() => {
  const secondNoteBlock = props.note.content.blocks[1];

  if (secondNoteBlock) {
    switch (secondNoteBlock.type) {
      case 'header':
      case 'paragraph':
        return secondNoteBlock.data.text.slice(0, limitCharsForNoteSubTitle);
      default:
        return '';
    }
  } else {
    return '';
  }
});
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
