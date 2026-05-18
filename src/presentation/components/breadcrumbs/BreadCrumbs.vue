<template>
  <RouterLink
    v-for="(parent, index) in displayedParents"
    :key="index"
    :to="`/note/${parent.id}`"
    class="breadcrumb"
  >
    {{ parentTitle(parent.content) }}
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
import { OutputData } from '@editorjs/editorjs';

const props = defineProps<{
  noteParents: (Note | { id: string; content: string })[];
}>();
/**
 * Note parents hierarchy
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

/**
 * title of the parent
 *
 * @param content - parent's content
 * @returns {string} - parent title in string implementation
 */
function parentTitle(content: string | null | OutputData): string {
  if (content === null) {
    return '...';
  }
  if (typeof content === 'string') {
    return content;
  }

  return getTitle(content);
}
</script>

<style scoped>
.breadcrumb {
  display: inline-flex;
  align-items: center;
}
</style>
