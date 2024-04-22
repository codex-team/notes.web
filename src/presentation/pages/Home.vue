<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">
      <div v-if="noteList">
        <div :class="[$style.noteList, cardOrientation === 'horizontal' ? $style.horizontal : '']">
          <div
            v-for="note in noteList.items"
            :key="note.id"
          >
            <RouterLink :to="`/note/${note.id}`">
              <Card
                :title="getTitle(note.content)"
                :updated-at="formatShortDate(note.updatedAt)"
                :button-text="t('note.open')"
                :orientation="cardOrientation"
              />
            </RouterLink>
          </div>
        </div>
        <Button
          :class="$style.button"
          @click="loadMoreNotes"
        >
          {{ $t('home.loadMore') }}
        </Button>
      </div>
      <div v-else>
        <p>{{ $t('home.emptyNoteList') }}</p>
      </div>
    </div>

    <div v-else>
      <p>{{ $t('home.authText') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import { Card } from 'codex-ui/vue';
import useNoteList from '@/application/services/useNoteList';
import { getTitle } from '@/infrastructure/utils/title';
import { formatShortDate } from '@/infrastructure/utils/date';
import { Button } from 'codex-ui/vue';
const { user } = useAppState();
const { t } = useI18n();
const { noteList, loadMoreNotes } = useNoteList();
const cardOrientation = ref<'horizontal' | 'vertical'>('horizontal');

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.noteList {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-m);
}

.horizontal {
  flex-direction: column;
}

.button {
  margin-top: var(--spacing-l);
}

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}
</style>
