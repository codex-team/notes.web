<template>
  <RouterLink
    v-for="(parent, index) in displayedParents"
    :key="index"
    :to="{ path: parent.id ? `/note/${parent.id}` : '' }"
  >
    {{ parent.content ? getTitle(parent.content) : '...' }}
    <span v-if="index < displayedParents.length - 1"> > </span>
  </RouterLink>
</template>

<script setup lang="ts">

import { getTitle } from '@/infrastructure/utils/note.ts';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { Note } from '@/domain/entities/Note.ts';

const props = defineProps<{
  noteParents: Note[];
}>();
/**
 * Displayed parents
 */
const displayedParents = computed(() => {
  if (props.noteParents.length > 3) {
    return [
      props.noteParents[0],
      { id: '',
        content: null },
      props.noteParents[props.noteParents.length - 1],
    ];
  }

  return props.noteParents;
});
</script>

<style scoped>

</style>
