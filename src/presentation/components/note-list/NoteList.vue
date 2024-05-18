<template>
  <div v-if="noteList?.items.length">
    <div
      v-for="note in noteList.items"
      :key="note.id"
    >
      <NoteView
        :note="note"
        @click="router.push('/note/' + note.id)"
      />
    </div>
    <button @click="loadMoreNotes">
      {{ $t('noteList.buttons.loadMoreNotes') }}
    </button>
  </div>

  <div v-else>
    <p>{{ $t('noteList.emptyNoteList') }}</p>
  </div>
</template>

<script setup lang="ts">
import NoteView from '@/presentation/components/note-list/NoteListItem.vue';
import { useRouter } from 'vue-router';
import useNoteList from '@/application/services/useNoteList.ts';

const router = useRouter();
const { noteList, loadMoreNotes } = useNoteList();
</script>

<style scoped lang="postcss"></style>
