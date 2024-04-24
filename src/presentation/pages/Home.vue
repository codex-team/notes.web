<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">
      <div v-if="noteList">
        <div :class="[$style.noteList]">
          <div
            v-for="note in noteList.items"
            :key="note.id"
          >
            <Card
              :title="getTitle(note.content)"
              :updated-at="formatShortDate(note.updatedAt)"
              orientation="horizontal"
            >
              <template #button>
                <RouterLink :to="`/note/${note.id}`">
                  <Button>{{ $t('note.open') }}</Button>
                </RouterLink>
              </template>
            </Card>
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
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import { Card } from 'codex-ui/vue';
import useNoteList from '@/application/services/useNoteList';
import { getTitle } from '@/infrastructure/utils/note';
import { formatShortDate } from '@/infrastructure/utils/date';
import { Button } from 'codex-ui/vue';
const { user } = useAppState();
const { t } = useI18n();
const { noteList, loadMoreNotes } = useNoteList();

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
  flex-direction: column;
  gap: var(--spacing-m);
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
