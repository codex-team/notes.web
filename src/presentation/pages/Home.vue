<template>
  <div>
    <Heading :level="1" :class="$style['home__heading']">
      {{ $t('home.title') }}
    </Heading>

    <div v-if="user">
      <div v-if="noteList">
        <div :class="$style['note-list']">
          <RouterLink
            v-for="note in noteList.items"
            :key="note.id"
            :to="`/note/${note.id}`"
          >
            <Card
            :class="$style['note-list__card']"
              :title="getTitle(note.content)"
              :subtitle="note.updatedAt ? formatShortDate(note.updatedAt) : ''"
              orientation="vertical"
            />
          </RouterLink>
        </div>

        <Button
          :class="$style.button"
          @click="loadMoreNotes"
        >
          {{ $t('loadMore') }}
        </Button>
      </div>

      <div v-else>
        <p>{{ $t('note.emptyNoteList') }}</p>
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
import useNoteList from '@/application/services/useNoteList';
import { getTitle } from '@/infrastructure/utils/note';
import { formatShortDate } from '@/infrastructure/utils/date';
import { Button, Card } from 'codex-ui/vue';
import { Heading } from 'codex-ui/vue';
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

.home {
  &__heading {
    margin: var(--spacing-xxl) 0;
  }
}

.note-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(252px, auto); 
  flex-direction: column;
  gap: var(--spacing-m);

  &__card {
    height: 100%;
  }
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
