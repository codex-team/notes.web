<template>
  <div
    :class="$style['note-header']"
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

// defineProps<{
// }>();

const lastEdit = computed(() => 'Севодня');
</script>
<style module lang="postcss">
.note-header {
  width: 100%;
  display: flex;
  height: min-content;
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
    }
  }
}
</style>
