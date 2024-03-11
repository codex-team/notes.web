<template>
  <div class="note">
    <div class="cover"></div>
    <div class="footer">
      <h2 class="noteTitle">{{ props.title }}</h2>
      <p class="updatedDate">{{ props.updatedAt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { defineProps } from 'vue';
const { t } = useI18n();

/**
 * NoteListItem props, receive Note
 */
const props = defineProps<{
  title: string;
  updatedAt: string;
}>();

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
