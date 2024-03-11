<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">
      <div
        v-if="noteList?.items.length"
        class="noteList"
      >
        <div
          v-for="note in noteList.items"
          :key="note.id"
        >
          <NoteListItem
            :title="getTitle(note.content)"
            :updated-at="getUpdateTime(note.updatedAt!)"
            @click="router.push('/note/' + note.id)"
          />
        </div>
      </div>
      <button @click="loadMoreNotes">{{ $t('home.loadMoreNotes') }}</button>
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
import { NoteListItem } from 'codex-ui/vue';
import useNoteList from '@/application/services/useNoteList';
import { useRouter } from 'vue-router';
import { getTitle, getUpdateTime } from '@/application/services/useNoteUtils';
const { user } = useAppState();
const { t } = useI18n();

const router = useRouter();
const { noteList, loadMoreNotes } = useNoteList();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style scoped lang="postcss">
@import '@/presentation/styles/typography.pcss';

.noteList {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}
</style>
