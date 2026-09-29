<template>
  <div
    v-if="noteList?.items.length === 0 && !isLoading"
    :class="$style['empty']"
  >
    <div :class="[$style['empty__title'], 'text-ui-large']">
      {{ t(onlyCreatedByUser ? 'noteList.empty.myNotes' : 'noteList.empty.recents') }}
    </div>
    <div :class="[$style['empty__text'], 'text-ui-base']">
      {{ t('noteList.empty.caption') }}
    </div>
    <Button
      icon="Plus"
      @click="router.push('/new')"
    >
      {{ t('note.new') }}
    </Button>
  </div>

  <div
    v-else
    :class="$style['grid']"
  >
    <RouterLink
      v-for="note in noteList?.items"
      :key="note.id"
      :to="`/note/${note.id}`"
      :class="$style['card']"
    >
      <div
        :class="[$style['card__cover'], note.cover !== null && coversLoading.has(note.id) && $style['skeleton']]"
      >
        <img
          v-if="note.cover?.startsWith('blob:')"
          :src="note.cover"
          alt=""
        >
        <span
          v-else-if="!coversLoading.has(note.id)"
          :class="$style['card__letter']"
        >
          {{ getTitle(note.content).charAt(0) }}
        </span>
      </div>
      <div :class="[$style['card__title'], 'text-ui-base-bold']">
        {{ getTitle(note.content) }}
      </div>
      <div
        v-if="note.updatedAt"
        :class="[$style['card__meta'], 'text-ui-small']"
      >
        {{ t('home.updated') }} {{ getTimeFromNow(note.updatedAt) }}
      </div>
    </RouterLink>

    <template v-if="isLoading">
      <div
        v-for="index in 6"
        :key="index"
        :class="$style['card']"
      >
        <div :class="[$style['card__cover'], $style['skeleton']]" />
        <div :class="[$style['skeleton'], $style['skeleton--line']]" />
        <div :class="[$style['skeleton'], $style['skeleton--line'], $style['skeleton--short']]" />
      </div>
    </template>
  </div>

  <div
    v-if="hasMoreNotes && !isLoading && noteList !== null"
    :class="$style['more']"
  >
    <Button
      secondary
      @click="loadMoreNotes"
    >
      {{ t('loadMore') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import useNoteList from '@/application/services/useNoteList';
import { getTimeFromNow } from '@/infrastructure/utils/date';
import { getTitle } from '@/infrastructure/utils/note';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Button } from '@codexteam/ui/vue';

interface Props {
  /**
   * If true, returns notes created by the user
   */
  onlyCreatedByUser?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  onlyCreatedByUser: false,
});

const {
  noteList,
  loadMoreNotes,
  hasMoreNotes,
  isLoading,
  coversLoading,
} = useNoteList(props.onlyCreatedByUser);
const { t } = useI18n();
const router = useRouter();
</script>

<style lang="postcss" module>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-l);
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  padding: var(--spacing-s) var(--spacing-s) var(--spacing-m);
  border-radius: var(--radius-ml);
  background-color: var(--base--bg-secondary);
  transition: background-color 120ms;
  min-width: 0;

  &:hover {
    background-color: var(--base--bg-secondary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--accent--solid);
  }

  &__cover {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 16 / 10;
    margin-bottom: var(--spacing-s);
    border-radius: var(--radius-m);
    overflow: hidden;
    background-color: var(--base--bg-primary);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }

  &__letter {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--base--border);
    text-transform: uppercase;
    user-select: none;
  }

  &__title {
    padding: 0 var(--spacing-xxs);
    color: var(--base--text);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__meta {
    padding: 0 var(--spacing-xxs);
    color: var(--base--text-secondary);
  }
}

.skeleton {
  background-color: color-mix(in srgb, var(--base--text-secondary) 10%, transparent);
  background-image: linear-gradient(
    to left,
    color-mix(in srgb, var(--base--text-secondary) 20%, transparent) 0%,
    color-mix(in srgb, var(--base--text-secondary) 8%, transparent) 50%,
    color-mix(in srgb, var(--base--text-secondary) 20%, transparent) 100%
  );
  background-size: 200% 100%;
  animation: skeleton 2s infinite linear;

  &--line {
    height: 10px;
    margin: var(--spacing-xs) var(--spacing-xxs) 0;
    border-radius: var(--radius-s);
  }

  &--short {
    width: 50%;
  }
}

@keyframes skeleton {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-s);
  padding: var(--spacing-xxl) var(--spacing-l);
  border-radius: var(--radius-ml);
  border: 1px dashed var(--base--border);
  text-align: center;

  &__text {
    color: var(--base--text-secondary);
    margin-bottom: var(--spacing-s);
  }
}

.more {
  display: flex;
  justify-content: center;
}
</style>
