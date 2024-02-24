<template>
  <div class="note">
    <div class="note-header">
      <h1 class="note-title">
        {{ noteTitle }}
      </h1>
      <p class="note-date">
        {{ noteCreatedDate }}
      </p>
    </div>
    <p class="note-sub">
      {{ noteSubTitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Note } from '@/domain/entities/Note.ts';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * NoteListItem props, receive Note
 */
const props = defineProps<{
  note: Note;
}>();

/**
 * Variables limiting the number of characters in the title and subtitle
 */
const limitCharsForNoteTitle = 50;
const limitCharsForNoteSubTitle = 96;

/**
 * Get the title from Note
 */
const noteTitle = computed(() => {
  const firstNoteBlock = props.note.content.blocks[0];

  if (!firstNoteBlock || firstNoteBlock.data.text === undefined) {
    return t('noteList.noteListItem.untitled');
  } else {
    return firstNoteBlock.data.text.slice(0, limitCharsForNoteTitle);
  }
});

/**
 * Get the subtitle depending on the type of block from Note
 */
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
/**
 * Get the creation date of the Note
 */
const noteCreatedDate = new Date(String(props.note.createdAt)).toLocaleDateString();
</script>

<style>
.note {
  margin: 20px 0;
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
  margin: 0;
}

.note-sub {
  margin-top: 4px;
  font-size: 16px;
  color: white;
  opacity: 0.5;
}
</style>
