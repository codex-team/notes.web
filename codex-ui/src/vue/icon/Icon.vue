<template>
  <span v-html="iconMap[props.name]" :class="$style['icon']"></span>
</template>


<script lang='ts' setup>
import * as iconMap from '@codexteam/icons';

const props = defineProps<{
  /**
   * Icon name
   */
  name: string;
}>();

defineExpose({ iconMap })
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
