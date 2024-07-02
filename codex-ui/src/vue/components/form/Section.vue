<template>
  <div :class="$style['form-section']">
    <div :class="[$style['form-section-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div
      :class="[
        $style['form-section-body-wrapper'],
        withBackground ? $style['form-section-body-wrapper--with-background'] : '',
      ]"
    >
      <slot />
    </div>
    <div :class="[$style['form-section-caption'], 'text-ui-subtle']">
      {{ caption }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    /**
     * Form section title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * Additional description of the embedded field
     */
    caption?: string;

    /**
     * True if there is a background in the component body
     */
    withBackground?: boolean;
  }>(),
  {
    caption: '',
    withBackground: true,
  }
);
</script>

<style module>
.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &-title,
  &-caption {
    padding-inline: var(--h-padding);
  }

  &-caption {
    color: var(--base--text-secondary);
  }

  &-body-wrapper {
    &--with-background {
      padding-block: var(--v-padding);
      border-radius: var(--radius-field);
      background-color: var(--base--bg-secondary);
    }
  }
}
</style>
