<template>
  <div v-if="user">
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>

    <div v-if="noteList">
      <div
        v-for="note in noteList.items"
        :key="note.id"
      >
        <NoteView
          :title="note.content.blocks[0]?.data?.text"
          :subtitle="note.content.blocks[1]?.data.text || ''"
          :created-at="note.createdAt"
          @click="router.push('/note/'+note.id)"
        />
      </div>
    </div>

    <div v-else>
      Loading...
    </div>
  </div>

  <div v-else>
    <h1>You are not logged in, log in to see your recent notes</h1>
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '@/application/services/useAppState';
import useNoteList from '@/application/services/useNoteList';
import NoteView from '@/presentation/components/note/NoteView.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user }= useAppState();


const { noteList } = useNoteList();


</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
