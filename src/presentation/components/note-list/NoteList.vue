<template>
  <div v-if="noteList?.items.length === 0">
    <p>{{ t('noteList.emptyNoteList') }}</p>
  </div>

  <div
    :class="$style['notes-container']"
  >
    <template v-if="noteList">
      <RouterLink
        v-for="note in noteList.items"
        :key="note.id"
        :to="`/note/${note.id}`"
      >
        <Card
          :title="getTitle(note.content)"
          :subtitle="getSubtitle(note)"
          :src="note.cover || undefined"
          orientation="vertical"
        />
      </RouterLink>
    </template>
    <template v-if="isLoading">
      <CardSkeleton
        v-for="index in 6"
        :key="index"
        orientation="vertical"
      />
    </template>
  </div>
  <Button
    v-if="hasMoreNotes"
    :class="$style.button"
    secondary
    @click="loadMoreNotes"
  >
    {{ $t('loadMore') }}
  </Button>
</template>

<script setup lang="ts">
import useNoteList from '@/application/services/useNoteList';
import type { Note } from '@/domain/entities/Note';
import { getTimeFromNow } from '@/infrastructure/utils/date';
import { getTitle } from '@/infrastructure/utils/note';
import { useI18n } from 'vue-i18n';
import { Card, CardSkeleton, Button } from 'codex-ui/vue';

const {
  noteList,
  loadMoreNotes,
  hasMoreNotes,
  isLoading,
} = useNoteList();
const { t } = useI18n();

/**
 * Returns card subtitle text
 *
 * @param note - Note entity
 *
 * @returns {string | undefined}
 */
function getSubtitle(note: Note): string | undefined {
  if (note.updatedAt === undefined) {
    return;
  }

  return `${t('home.updated')} ${getTimeFromNow(note.updatedAt)}`;
}

</script>

<style lang="postcss" module>
.notes-container {
  padding: var(--spacing-xxl) 0;
  gap: var(--spacing-ml);
  display: grid;
  width: 100%;
  box-sizing: border-box;
  grid-template-columns: repeat(3, 1fr);
}

.button {
  margin-top: var(--spacing-l);
}
</style>
