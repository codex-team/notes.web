<template>
  <div>
    <Heading :level="1" :class="$style['home__heading']">
      {{ $t('home.title') }}
    </Heading>

    <div v-if="!user">
      <p>{{ $t('home.authText') }}</p>
    </div>

    <div v-if="user && noteList?.items.length === 0">
      <p>{{ $t('noteList.emptyNoteList') }}</p>
    </div>

    <div v-if="noteList">
      <div :class="$style['note-list']">
        <RouterLink v-for="note in noteList.items" :key="note.id" :to="`/note/${note.id}`">
          <Card 
            :class="$style['note-list__card']" 
            :title="getTitle(note.content)" 
            :subtitle="getSubtitle(note)"
            orientation="vertical" />
        </RouterLink>
      </div>

      <Button :class="$style.button" @click="loadMoreNotes">
        {{ $t('loadMore') }}
      </Button>
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
import { Note } from '@/domain/entities/Note';

const { user } = useAppState();
const { t } = useI18n();
const { noteList, loadMoreNotes } = useNoteList();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});

/**
 * Returns card subtitle text
 * @param note - Note entity
 */
function getSubtitle(note: Note): string | undefined{
  if (note.updatedAt === undefined) {
    return;
  }

  return t('home.updated') + ' ' + formatShortDate(note.updatedAt);
}

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
  flex-direction: column;
  gap: var(--spacing-ml);

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
