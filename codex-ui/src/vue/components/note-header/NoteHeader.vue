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
import { defineProps, computed } from 'vue';
import Button from '../button/Button.vue';

// defineProps<{
// }>();

const lastEdit = computed(() => 'Севодня');
</script>
<style module lang="postcss">
.note-header {
  display: flex;
  height: min-content;

  &__left {
    display: flex;
    align-items: center;
    color: var(--base--text-secondary);
  }

  &__right {
    display: flex;
  }

  &__button {
    color: var(--base--text-secondary);
    background-color: var(--base--bg-secondary);
  }
}
</style>
