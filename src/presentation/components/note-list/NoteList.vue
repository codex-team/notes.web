<template>
  <div
    v-if="noteList?.items.length"
    class="noteList"
  >
    <div
      v-for="note in noteList.items"
      :key="note.id"
    >
      <NoteListItem
        :note="note"
        @click="router.push('/note/' + note.id)"
      />
    </div>
    <button @click="loadMoreNotes">{{ $t('noteList.buttons.loadMoreNotes') }}</button>
  </div>

  <div v-else>
    <p>{{ $t('noteList.emptyNoteList') }}</p>
  </div>
</template>

<script setup lang="ts">
import NoteListItem from '@/presentation/components/note-list/NoteListItem.vue';
import { useRouter } from 'vue-router';
import useNoteList from '@/application/services/useNoteList.ts';

const router = useRouter();
const { noteList, loadMoreNotes } = useNoteList();
</script>

<style>
.noteList {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
