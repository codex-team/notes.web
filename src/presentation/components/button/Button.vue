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
import themeService from '@/application/services/themeService';
import { computed, onMounted, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
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
}>(), {
  type: 'secondary',
  text: undefined,
  icon: undefined,
  link: undefined,
});

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
  click: [event: MouseEvent],
}>();

/**
 * Button click handler
 *
 * @param event - click event
 */
function onClick(event: MouseEvent) {
  emit('click', event);
}
const theme = computed(() => themeService.currentAccentTheme.value);


watch(theme, (newTheme) => {
  var allPrimary = document.getElementsByClassName('button--primary');
  var allSecondary = document.getElementsByClassName('button--secondary');
  var allTransparent = document.getElementsByClassName('button--transparent');

  for (var i = 0; i < allPrimary.length; i++) {
    (allPrimary[i] as HTMLElement).style.backgroundColor = `var(--accent-${newTheme.toLowerCase()}-solid)`;
    (allPrimary[i] as HTMLElement).style.color = `var(--accent-${newTheme.toLowerCase()}-text)`;
  }

  for (var k=0; k < allTransparent.length; k++) {
    (allTransparent[k] as HTMLElement).style.color = `var(--accent-${newTheme.toLowerCase()}-text)`;
  }

  for (var s=0; s < allSecondary.length; s++) {
    (allSecondary[s] as HTMLElement).style.backgroundColor = `var(--accent-${newTheme.toLowerCase()}-solidSecondary)`;
  }
});

onMounted(() => {
  var allPrimary = document.getElementsByClassName('button--primary');
  var allSecondary = document.getElementsByClassName('button--secondary');
  var allTransparent = document.getElementsByClassName('button--transparent');

  for (var i=0; i < allPrimary.length; i++) {
    (allPrimary[i] as HTMLElement).style.backgroundColor = `var(--accent-${theme.value.toLowerCase()}-solid)`;
    (allPrimary[i] as HTMLElement).style.color = `var(--accent-${theme.value.toLowerCase()}-text)`;
  }

  for (var k=0; k < allTransparent.length; k++) {
    (allTransparent[k] as HTMLElement).style.color = `var(--accent-${theme.value.toLowerCase()}-text)`;
  }

  for (var s=0; s < allSecondary.length; s++) {
    (allSecondary[s] as HTMLElement).style.backgroundColor = `var(--accent-${theme.value.toLowerCase()}-solidSecondary)`;
  }
});
console.log(theme);
</script>

<style scoped lang="postcss">
@import '@/presentation/styles/typography.pcss';


.button {
  @apply --text-small;

  border-radius: var(--radius-m);
  padding: var(--spacing-xxs) var(--spacing-ms);
  align-items: center;
  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-very-x);
  cursor: pointer;
  user-select: none;

  &--primary {
    background-color: var(--accent-red-solid);
    color: var(--color-text-contrast);
  }

  &--secondary {
    background: var(--accent-secondary);
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
