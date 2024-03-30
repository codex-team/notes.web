<template>
  <span v-html="src" :class="$style['icon']"></span>
</template>


<script lang='ts' setup>
defineProps<{
  /**
   * Path to the icon
   */
  src: string;
}>();
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
