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
        icon="Plus"
        :class="$style['note-header__button']"
      />
      <Button
        icon="EtcHorisontal"
        :class="$style['note-header__button']"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '../button/Button.vue';

const props = withDefaults(
  defineProps<{
    /**
     * Explanatory caption for the date
     */
    description?: string;

    /**
     * Date and time of last update
     */
    lastUpdate?: string;

    /**
     * Shows the transparency percentage of the component, from 0 to 1
     */
    opacity: number;
  }>(),
  {
    description: '',
    updatedAt:'',
    opacity: 1,
  }
);

const lastEdit = computed(() => props.description + ' ' + props.updatedAt);
</script>
<style module lang="postcss">
.note-header {
  width: 100%;
  display: flex;
  height: min-content;
  opacity: var(--opacity);
  justify-content: space-between;
  padding: var(--spacing-s) var(--spacing-m);

  &__left {
    display: flex;
    align-items: center;
    color: var(--base--text-secondary);
  }

  &__right {
    display: flex;
    gap: var(--spacing-s);
  }

  &__button {
    padding: var(--spacing-s);
    color: var(--base--text-secondary);
    background-color: var(--base--bg-secondary);

    &:hover {
      background-color: var(--base--bg-secondary-hover);
      color: var(--base--text-secondary-hover);
    }
  }
}
</style>
