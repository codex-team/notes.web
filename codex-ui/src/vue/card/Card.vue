<template>
  <div :class="[$style.note, orientation === 'horizontal' ? $style.horizontal : '']">
    <div :class="[$style.cover, orientation === 'horizontal' ? $style.horizontalCover : '']"></div>
    <div :class="$style.footer">
      <Heading
        :level="3"
        class="text-ui-base-bold"
        >{{ title }}</Heading
      >
      <div :class="[$style.updatedAt, 'text-ui-subtle']">{{ updatedAt }}</div>
    </div>
    <Button size="medium">{{ buttonText }}</Button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Heading from '../heading/Heading.vue';
import Button from '../button/Button.vue';
import type { CardOrientation } from './Card.types';

/**
 * NoteListItem props, receive Note
 *
 * @param {string} title - Note title
 * @param {string} updatedAt - Last updated date of note
 * @param {string} buttonText - Button text
 * @param orientation - Orientation of card
 */
defineProps<{
  title: string;
  updatedAt: string;
  buttonText: string;
  orientation: CardOrientation;
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

.horizontal {
  width: 100%;
  flex-direction: row;
  gap: var(--spacing-l);
  align-items: center;
}

.cover {
  width: 100%;
  height: 140px;
  border-radius: var(--radius-m);
  background-color: var(--base--bg-primary);
}

.footer {
  width: 100%;
}

.horizontalCover {
  width: 150px;
  height: 100px;
  border-radius: var(--radius-m);
  background-color: var(--base--bg-primary);
}
.noteTitle {
  color: var(--base--text);
  font-size: var(--text-p);
  font-weight: 700;
}
</style>
