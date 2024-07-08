<template>
  <ThreeColsLayout data-dimensions="large">
    <router-link
      to="/new"
    >
      <Container>
        <div :class="$style['container__create-new-note']">
          <Row
            :title="t('home.createNewNote.title')"
            :subtitle="t('home.createNewNote.caption')"
          >
            <template #left>
              <Picture :name="t('home.createNewNote.pictureName')" />
            </template>
            <template #right>
              <Button
                secondary
                trailing-icon="ChevronRight"
              >
                {{ t('home.createNewNote.button') }}
              </Button>
            </template>
          </Row>
        </div>
      </Container>
    </router-link>
    <Heading
      :level="1"
      :class="$style['page-header']"
    >
      {{ $t('home.title') }}
    </Heading>

    <div v-if="user === null">
      <p>{{ $t('home.authText') }}</p>
    </div>

    <div v-if="user && noteList?.items.length === 0">
      <p>{{ $t('noteList.emptyNoteList') }}</p>
    </div>

    <div
      v-if="noteList"
      :class="$style['notes-container']"
    >
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
    </div>
    <Button
      v-if="currentPage !== 1"
      :class="$style.button"
      @click="loadPreviousPageNotes"
    >
      {{ t('getBack') }}
    </Button>
    <Button
      v-if="nextPageNotes?.items.length !== 0"
      :class="$style.button"
      @click="loadNextPageNotes"
    >
      {{ $t('loadMore') }}
    </Button>
  </ThreeColsLayout>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import useNoteList from '@/application/services/useNoteList';
import { getTitle } from '@/infrastructure/utils/note';
import { formatShortDate } from '@/infrastructure/utils/date';
import { Container, Row, Picture, Button, Heading, Card } from 'codex-ui/vue';
import { Note } from '@/domain/entities/Note';
import ThreeColsLayout from '@/presentation/layouts/ThreeColsLayout.vue';
import { onMounted, ref } from 'vue';
import { NoteList } from '@/domain/entities/NoteList';

const { user } = useAppState();
const { t } = useI18n();
const { noteList, load, loadPreviousPage, currentPage } = useNoteList();

const nextPageNotes = ref<NoteList | null>(null);

/**
 * On mount of the page we will know if there are more motes to load on next page
 */
onMounted(async () => {
  nextPageNotes.value = await load(currentPage.value + 1);
});

/**
 * Function that will update current page notes
 * Also it will increase number of currnet page and update nextPageNotes
 */
async function loadNextPageNotes() {
  noteList.value = nextPageNotes.value;
  currentPage.value += 1;
  nextPageNotes.value = await load(currentPage.value + 1);
}

/**
 * Function that will load previous page of the notes
 * Also update nextPageNotes
 */
async function loadPreviousPageNotes() {
  nextPageNotes.value = noteList.value;
  noteList.value = await loadPreviousPage();
}

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
.container {
  display: grid;
  padding: var(--spacing-xxl) 0;
  gap: var(--spacing-xxl);

  &__create-new-note {
    padding: var(--v-padding) 0;
  }
}

.page-header {
  padding: var(--spacing-xxl) var(--h-padding) 0;
}

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
