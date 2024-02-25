<template>
  <div :class="[$style['form-section'], `${$style['form-section']}--${size}`]">
    <div :class="[$style['form-section-title'], 'text-ui-footnote']">
      {{ title }}
    </div>
    <div :class="$style['form-section-field']">
      <Input
        :size="size"
        :disabled="disabled"
        v-model="model"
        :value="value"
      />
      <div :class="[$style['form-section-caption'], 'text-ui-subtle']">
        {{ caption }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Input } from '@/vue';

const props = withDefaults(
  defineProps<{
    /**
     * Input value
     */
    value?: string;

    /**
     * Form section title
     * Will be displayed as a heading
     */
    title: string;

    /**
     * The size of the input
     * Will be passed to the input component
     */
    caption?: string;

    /**
     * The size of the form section
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Whether the form section is disabled
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
.form-section {
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
}
</style>
