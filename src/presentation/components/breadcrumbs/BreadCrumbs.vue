<template>
  <nav
    class="breadcrumbs text-ui-base"
    :aria-label="t('note.breadcrumbs')"
  >
    <template
      v-for="(parent, index) in displayedParents"
      :key="parent?.id ?? index"
    >
      <RouterLink
        v-if="parent"
        :to="`/note/${parent.id}`"
        class="breadcrumbs__item"
        :class="{ 'breadcrumbs__item--current': index === displayedParents.length - 1 }"
        :title="getTitle(parent.content)"
      >
        {{ getTitle(parent.content) }}
      </RouterLink>
      <span
        v-else
        class="breadcrumbs__gap"
      >…</span>
      <Icon
        v-if="index < displayedParents.length - 1"
        name="ChevronRight"
        class="breadcrumbs__separator"
      />
    </template>
  </nav>
</template>

<script setup lang="ts">
import { getTitle } from '@/infrastructure/utils/note.ts';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Note } from '@/domain/entities/Note.ts';
import { Icon } from '@codexteam/ui/vue';

const props = defineProps<{
  noteParents: Note[];
}>();

const { t } = useI18n();

/**
 * Note parents hierarchy
 * If there are more than 3, only the furthest and the two closest ones are shown
 */
const displayedParents = computed<(Note | null)[]>(() => {
  const parents = props.noteParents;

  if (parents.length > 3) {
    return [parents[0], null, ...parents.slice(-2)];
  }

  return parents;
});
</script>

<style scoped lang="postcss">
.breadcrumbs {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: var(--spacing-xxs);

  &__item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 220px;
    min-width: 3em;
    padding: var(--spacing-xxs) var(--spacing-xs);
    border-radius: var(--radius-s);

    &:hover {
      color: var(--base--text);
      background-color: var(--base--bg-secondary-hover);
    }

    &--current {
      color: var(--base--text);
      max-width: 400px;
    }
  }

  &__gap {
    padding: 0 var(--spacing-xxs);
  }

  &__separator {
    flex-shrink: 0;
    opacity: 0.6;
  }
}
</style>
