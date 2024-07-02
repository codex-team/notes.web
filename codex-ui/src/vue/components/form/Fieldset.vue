<template>
  <div :class="[$style['fieldset'], $style['fieldset__title'], 'text-ui-large']">
    {{ title }}
  </div>
  <slot />
</template>

<script setup lang="ts">

defineProps<{
  title: string;
}>();

</script>

<style module>
@import url('@/styles/typography.pcss');

.fieldset {
  display: grid;
  gap: var(--v-padding);

  &__title {
    padding: var(--v-padding) var(--h-padding) ;
    margin-bottom: var(--v-padding);
  }

  &__sections {
    gap: var(--spacing-xl);
  }
}
</style>
