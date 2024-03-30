<template>
  <span v-html="iconMap[props.src]" :class="$style['icon']"></span>
</template>


<script lang='ts' setup>
const props = defineProps<{
  /**
   * Icon source code
   */
  src: string;
}>();

import * as iconMap from '@codexteam/icons';
</script>

<style module lang="postcss">

.icon {
  --icon-size: var(--size-icon);
  display: inline-block;
  opacity: 50%;
  width: var(--icon-size);
  height: var(--icon-size);
}

</style>
