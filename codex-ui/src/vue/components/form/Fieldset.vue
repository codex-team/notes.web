<template>
  <div :class="$style['fieldset']">
    <div :class="[$style['fieldset__title'], 'text-ui-large']">
      {{ title }}
    </div>
    <div :class="$style['fieldset__sections']">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  /**
   * Fieldset title
   * Will be displayed as a heading of the fieldset
   */
  title: string;
}>();

</script>

<style module>
@import url('@/styles/typography.pcss');

.fieldset {
  display: grid;
  gap: var(--v-padding);

  &__title {
    padding: var(--v-padding) var(--h-padding);
  }

  &__sections {
    display: grid;
    gap: var(--spacing-xl);
  }
}
</style>
