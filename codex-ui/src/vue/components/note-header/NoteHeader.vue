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
      />
      <Button
        secondary
        icon="EtcHorisontal"
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
    lastUpdate: '',
    opacity: 1,
  }
);

const lastEdit = computed(() => props.description + ' ' + props.lastUpdate);
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
