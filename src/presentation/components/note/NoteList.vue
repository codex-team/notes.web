<template>
  <div v-if="noteList?.items.length">
    <div
      v-for="note in noteList.items"
      :key="note.id"
    >
      <NoteView
        :note="note"
        @click="router.push('/note/'+note.publicId)"
      />
    </div>
  </div>

  <div v-else>
    <p>{{ $t('noteList.noNoteList') }}</p>
  </div>
</template>

<script setup lang="ts">
import NoteView from '@/presentation/components/note/NoteView.vue';
import { useRouter } from 'vue-router';
import useNoteList from '@/application/services/useNoteList';

const router = useRouter();
const { noteList } = useNoteList();

console.log(noteList);

</script>

<style scoped lang="postcss">

</style>
