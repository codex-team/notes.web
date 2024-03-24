<template>
  <div class="note">
    <div class="cover"></div>
    <div class="footer">
      <h2 class="noteTitle">{{ noteTitle }}</h2>
      <p class="updatedDate">{{ formattedUpdatedAt }}</p>
    </div>
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
 * Get the update date of the Note
 */
const noteUpdatedAt = new Date(String(props.note.updatedAt));

const currentDate = new Date();

const timeDifference = currentDate.getTime() - noteUpdatedAt.getTime();
const secondsDifference = Math.floor(timeDifference / 1000);
const minutesDifference = Math.floor(secondsDifference / 60);
const hoursDifference = Math.floor(minutesDifference / 60);
const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
const weeksDifference = Math.floor(daysDifference / 7);
const monthsDifference = Math.floor(daysDifference / 30);
const yearsDifference = Math.floor(daysDifference / 365);
let formattedUpdatedAt: string;

if (secondsDifference < 60) {
  formattedUpdatedAt = 'Just now';
} else if (minutesDifference < 60) {
  formattedUpdatedAt = `${minutesDifference} ${minutesDifference === 1 ? 'minute' : 'minutes'} ago`;
} else if (hoursDifference < 24) {
  formattedUpdatedAt = `${hoursDifference} ${hoursDifference === 1 ? 'hour' : 'hours'} ago`;
} else if (daysDifference < 7) {
  formattedUpdatedAt = `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
} else if (daysDifference < 30) {
  formattedUpdatedAt = `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
} else if (daysDifference < 365) {
  formattedUpdatedAt = `${monthsDifference} ${monthsDifference === 1 ? 'month' : 'months'} ago`;
} else {
  formattedUpdatedAt = `${yearsDifference} ${yearsDifference === 1 ? 'year' : 'years'} ago`;
}
</script>

<style>
.note {
  display: flex;
  flex-direction: column;
  width: 222px;
  align-items: flex-start;
  gap: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: var(--accent--bg-secondary);
}

.cover {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  background-color: var(--accent--bg-primary);
}
.noteTitle {
  color: var(--accent--text);
  font-size: 16px;
  font-weight: 700;
}
</style>
