<template>
  <div :class="$style['context-menu']">
    <div :class="$style['context-menu-body']">
      <slot />
    </div>
    <div
      v-if="hasDelimiter"
      :class="$style['context-menu-delimiter']"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  /**
   * True if context menu should contain delimiter
   */
  hasDelimiter?: boolean;
}>();
</script>

<style module>
.context-menu {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &-delimiter {
    background: var(--base--border);
    align-self: stretch;
    height: var(--delimiter-height);
  }
}
</style>
