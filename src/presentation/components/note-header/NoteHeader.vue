<template>
  <div
    :class="$style['note-header']"
    :style="{ '--opacity': props.opacity }"
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
        @click="getNoteSettings"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Button } from 'codex-ui/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

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

    /**
     * Shows the transparency percentage of the component, from 0 to 1
     */
    opacity: number;
  }>(),
  {
    parentId: undefined,
    opacity: 1,
  }
);

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
function getNoteSettings(): void {
  if (props.id === null) {
    throw new Error('Note is Empty');
  }
  router.push(`/note/${props.id}/settings`);
}

const lastEdit = computed(() => 'Севодня');
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
