<template>
  <div
    :class="[$style['tool-icon'], 'text-ui-base-bold']"
    :theme-base="color"
    aria-hidden="true"
  >
    {{ title.charAt(0).toUpperCase() }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  /**
   * Tool title, its first letter is displayed
   */
  title: string;
}>();

const colors = ['sky', 'violet', 'grass', 'amber', 'crimson', 'graphite'];

/**
 * Stable color picked by the title, so each tool is recognizable in lists
 */
const color = computed(() => colors[[...props.title].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length]);
</script>

<style module>
.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-m);
  background-color: var(--base--solid);
  color: var(--base--text-solid-foreground);
}
</style>
