<template>
  <div
    :class="$style['note-header']"
  >
    <div :class="$style['note-header__left']">
      {{ lastEdit }}
    </div>
    <div :class="$style['note-header__right']">
      <Button
        secondary
        icon="Plus"
        @click="createChildNote"
      />
      <Button
        secondary
        icon="EtcHorisontal"
        @click="redirectToNoteSettings"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef, ref, watch } from 'vue';
import { Button } from 'codex-ui/vue';
import { useRouter } from 'vue-router';
import useNote from '@/application/services/useNote';
import { formatShortDate } from '@/infrastructure/utils/date';

const props = withDefaults(
  defineProps<{
    /**
     * Null for new note, id for reading existing note
     */
    id: string | null;

    /**
     * Parent note id, undefined for root note
     */
    parentId?: string;
  }>(),
  {
    parentId: undefined,
  }
);

const noteId = toRef(props, 'id');
const router = useRouter();
const { note } = useNote({
  id: noteId,
});
const lastEdit = ref<string>('Last edit ');

/**
 * Create new child note
 */
function createChildNote(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/new`);
}

/**
 * Move to note settings
 */
function redirectToNoteSettings(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/settings`);
}

/**
 * Loads the time when the note was last modified when opened
 */
watch(note, () => {
  if (note.value !== null && 'updatedAt' in note.value) {
    const updatedAt = note.value.updatedAt;

    if (typeof updatedAt === 'string') {
      lastEdit.value = 'Last edit ' + formatShortDate(updatedAt);
    }
  }
});

</script>
<style module lang="postcss">
.note-header {
  width: 100%;
  display: flex;
  align-items: center;
  height: min-content;
  opacity: var(--opacity);
  justify-content: space-between;
  padding: var(--spacing-s) var(--spacing-m);

  &__left {
    color: var(--base--text-secondary);
  }

  &__right {
    display: flex;
    gap: var(--spacing-s);
  }
}
</style>
