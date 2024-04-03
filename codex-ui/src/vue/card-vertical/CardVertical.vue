<template>
  <div :class="$style.note">
    <div :class="$style.cover"></div>
    <div :class="$style.footer">
      <Heading
        :level="3"
        class="text-ui-base-bold"
        >{{ title }}</Heading
      >
      <div :class="[$style.updatedAt, 'text-ui-subtle']">{{ updatedAt }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Heading from '../heading/Heading.vue';

/**
 * NoteListItem props, receive Note
 *
 * @param {string} title - Note title
 * @param {string} updatedAt - Last updated date of note
 */
defineProps<{
  title: string;
  updatedAt: string;
}>();
</script>

<style module >
.note {
  display: flex;
  flex-direction: column;
  width: 222px;
  align-items: flex-start;
  gap: var(--spacing-l);
  border-radius: var(--radius-m);
  padding: var(--spacing-m);
  background-color: var(--base--bg-secondary);
}

.cover {
  width: 100%;
  height: 140px;
  border-radius: var(--radius-m);
  background-color: var(--base--bg-primary);
}
.noteTitle {
  color: var(--base--text);
  font-size: var(--text-p);
  font-weight: 700;
}
</style>
