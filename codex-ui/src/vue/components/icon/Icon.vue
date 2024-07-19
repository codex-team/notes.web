<template>
  <!-- eslint-disable vue/no-v-html -->
  <span
    :class="$style['icon']"
    v-html="iconSource"
  />
  <!-- eslint-disable vue/no-v-html -->
</template>

<script lang="ts" setup>
import * as iconMap from '@codexteam/icons';
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Icon name
   */
  name: string | null;
}>();

const iconSource = computed(() => {
  return iconMap[('Icon' + props.name) as keyof typeof iconMap];
});
</script>

<style module lang="postcss">
.icon {
  display: inline-block;
  width: var(--size-icon);
  height: var(--size-icon);

  svg {
    width: var(--size-icon);
    height: var(--size-icon);
  }
}
</style>
