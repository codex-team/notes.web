<template>
  <div :class="[$style['field'], `${$style['field']}--${size}`]">
    <div :class="[$style['field-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div :class="$style['field-field']">
      <Input
        :size="size"
        :disabled="disabled"
        v-model="model"
        :value="value"
      />
      <div :class="[$style['field-caption'], 'text-ui-subtle']">
        {{ caption }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';
import { FieldSize } from './Field.types'

const props = withDefaults(
  defineProps<{
    /**
     * Input value
     */
    value?: string;

    /**
     * Form field title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * The size of the input
     * Will be passed to the input component
     */
    caption?: string;

    /**
     * The size of the form field
     */
    size?: FieldSize;

    /**
     * Whether the form field is disabled
     */
    disabled?: boolean;
  }>(),
  {
    value: '',
    caption: '',
    size: 'medium',
    disabled: false,
  }
);

const model = defineModel();
</script>

<style module>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  --h-padding: var(--spacing-m);

  &--small {
    --h-padding: var(--spacing-s);
  }

  &--medium {
    --h-padding: var(--spacing-m);
  }

  &--large {
    --h-padding: var(--spacing-l);
  }

  &-title,
  &-caption {
    padding-top: var(--spacing-xs);
    padding-inline: var(--h-padding);
  }

  &-caption {
    color: var(--base--text-secondary);
  }
}
</style>
