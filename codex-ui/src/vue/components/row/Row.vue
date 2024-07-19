<template>
  <div :class="$style.row">
    <div
      v-if="$slots.left"
      :class="$style['row__left']"
    >
      <slot name="left" />
    </div>

    <div :class="$style['row__body']">
      <div :class="$style['row__body-inner']">
        <div :class="$style['row__center']">
          <div
            v-if="label"
            :class="[$style['row__label'], 'text-ui-footnote']"
          >
            {{ label }}
          </div>

          <div :class="[$style['row__title'], 'text-ui-base-medium']">
            {{ title }}
          </div>

          <div
            v-if="subtitle"
            class="text-ui-subtle"
          >
            {{ subtitle }}
          </div>
        </div>

        <div
          v-if="$slots.right"
          :class="$style['row__right']"
        >
          <slot name="right" />
        </div>
      </div>

      <div
        v-if="hasDelimiter"
        :class="$style['row__delimiter']"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * Title to be displayd in row component.
   * Largest text inside row
   */
  title: string;

  /**
   * Secondary text displayed above the title
   */
  label?: string;

  /**
   * Secondary text displayed below the title
   */
  subtitle?: string;

  /**
   * True if row should contain delimiter
   */
  hasDelimiter?: boolean;
}>();
</script>

<style module lang="postcss">
.row {
  padding-left: var(--h-padding);
  display: flex;
  gap: var(--h-padding);

  &__left {
    display: flex;
    align-items: center;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__body-inner {
    display: flex;
    flex: 1;
    padding: var(--v-padding) var(--h-padding) var(--v-padding) 0;
    gap: var(--spacing-m);
    align-items: center;
  }

  &__delimiter {
    background: var(--base--border);
    align-self: stretch;
    height: var(--delimiter-height);
  }

  &__center {
    height: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-very-x);
  }

  &__right {
    display: flex;
    align-items: center;
  }
}
</style>
