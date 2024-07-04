<template>
  <ThreeColsLayout>
    <Heading
      :level="1"
      :class="$style['home__heading']"
    >
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
        <RouterLink
          v-for="note in noteList.items"
          :key="note.id"
          :to="`/note/${note.id}`"
        >
          <Card
            :class="$style['note-list__card']"
            :title="getTitle(note.content)"
            :subtitle="getSubtitle(note)"
            :src="note.cover || undefined"
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
  </ThreeColsLayout>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import useNoteList from '@/application/services/useNoteList';
import { getTitle } from '@/infrastructure/utils/note';
import { formatShortDate } from '@/infrastructure/utils/date';
import { Button, Card, Heading } from 'codex-ui/vue';
import { Note } from '@/domain/entities/Note';
import ThreeColsLayout from '@/presentation/layouts/ThreeColsLayout.vue';

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
 *
 * @param note - Note entity
 *
 * @returns {string | undefined}
 */
function getSubtitle(note: Note): string | undefined {
  if (note.updatedAt === undefined) {
    return;
  }

  return t('home.updated') + ' ' + formatShortDate(note.updatedAt);
}

</script>

<style lang="postcss" module>
h1.home {
  &__heading {
    margin-bottom: var(--spacing-xxl);
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

</style>
