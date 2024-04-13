<template>
  <span
    :class="$style['icon']"
    v-html="iconSource"
  ></span>
</template>


<script lang='ts' setup>
import * as iconMap from '@codexteam/icons';
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Icon name
   */
  name: string;
}>();

const iconSource = computed(() => {
  return iconMap[('Icon' + props.name) as keyof typeof iconMap];
});
</script>

<style module lang="postcss">
.icon {
  --icon-size: var(--size-icon);
  display: inline-block;
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
