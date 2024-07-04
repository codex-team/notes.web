<template>
  <component
    :is="component"
    ref="button"
    :to="link"
    :href="link"
    class="button"
    :class="{
      'button--only-icon': isOnlyIcon,
      'button--primary': type === 'primary',
      'button--secondary': type === 'secondary',
      'button--transparent': type === 'transparent',
    }"
    @click.passive="onClick"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div
      v-if="icon"
      class="button__icon"
      v-html="icon"
    />
    <div
      v-if="text"
      class="button__text"
    >
      {{ text }}
    </div>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Text displayed on button
     */
    text?: string;

    /**
     * Icon at left side of button
     */
    icon?: string;

    /**
     * Link to navigate on click
     */
    link?: string;

    /**
     * Button style type
     */
    type?: 'primary' | 'secondary' | 'transparent';
  }>(),
  {
    type: 'secondary',
    text: undefined,
    icon: undefined,
    link: undefined,
  }
);

/**
 * True if button contains only icon
 */
const isOnlyIcon = computed(() => !props.text && props.icon);

/**
 * Reference to button element
 */
const button = ref(null);

/**
 * If we have link prop, we should use router-link component,
 * otherwise we should will use div
 */
const component = computed(() => {
  if (props.link) {
    if (props.link.startsWith('http')) {
      return 'a';
    } else {
      return 'router-link';
    }
  }

  return 'div';
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

/**
 * Button click handler
 *
 * @param event - click event
 */
function onClick(event: MouseEvent) {
  emit('click', event);
}
</script>

<style lang="postcss">
.button {
  border-radius: var(--radius-m);
  padding: var(--spacing-xxs) var(--spacing-ms);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;

  &--primary {
    background: var(--accent--bg-primary);
    color: var(--accent--text);
  }

  &--secondary {
    background: var(--accent--bg-secondary);
    color: var(--color-text-main);
  }

  &--transparent {
    background: transparent;
    color: var(--color-text-main);

    &:hover {
      background: var(--color-bg);
    }
  }

  &__text {
    line-height: var(--size-icon);
    font-weight: 600;
    white-space: nowrap;
  }

  &__icon {
    height: var(--size-icon);
    width: var(--size-icon);
    flex-shrink: 0;
  }

  &--only-icon {
    padding: var(--spacing-xxs);
  }
}
</style>
