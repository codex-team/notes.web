<template>
  <div>
    <h1>Join</h1>
  </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useNoteSettings from '@/application/services/useNoteSettings';

const route = useRoute();
const { joinNote } = useNoteSettings();

onMounted(async () => {
  await joinNote(route.params.id as string);
});
</script>