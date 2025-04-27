<template>
  <RouterLink
    v-for="(parent, index) in displayedParents"
    :key="index"
    :to="{ path: parent.id ? `/note/${parent.id}` : '' }"
    class="breadcrumb"
  >
    {{ parent.content ? getTitle(parent.content) : '...' }}
    <Icon
      v-if="index < displayedParents.length - 1"
      name="ChevronRight"
    />
  </RouterLink>
</template>

<script setup lang="ts">

import { getTitle } from '@/infrastructure/utils/note.ts';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { Note } from '@/domain/entities/Note.ts';
import { Icon } from '@codexteam/ui/vue';

const props = defineProps<{
  noteParents: Note[];
}>();
/**
 * Note's parents hierarchy
 * If there are more than 3, only the closest & the furthest ones are shown
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
.breadcrumb {
  display: inline-flex;
  align-items: center;
}
</style>
