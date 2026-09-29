<template>
  <img
    v-if="src && !hasLoadingError"
    :src="src"
    :alt="`Avatar of ${username}`"
    :class="$style[`avatar--${size}`]"
    referrerpolicy="no-referrer"
    @error="hasLoadingError = true"
  >
  <span
    v-else
    :class="[$style[`avatar--${size}`], $style['avatar--placeholder']]"
    :title="username"
  >
    {{ initials }}
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  /**
   * Path to the image
   */
  src: string;

  /**
   * Name of the user
   * Its initials are displayed when there is no image
   */
  username: string;

  /**
   * Size of the avatar image
   * medium by default
   */
  size: 'medium' | 'small';
}>(),
{
  src: undefined,
  username: undefined,
  size: 'medium',
});

const hasLoadingError = ref(false);

watch(() => props.src, () => {
  hasLoadingError.value = false;
});

const initials = computed(() => (props.username ?? '')
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(word => word[0].toUpperCase())
  .join('') || '?');
</script>

<style module>
.avatar {
  &--small {
    width: var(--size-icon);
    height: var(--size-icon);
    border-radius: var(--radius-s);
    font-size: 9px;
  }

  &--medium {
    width: var(--size-avatar);
    height: var(--size-avatar);
    border-radius: var(--radius-m);
    font-size: 12px;
  }

  &--small,
  &--medium {
    flex-shrink: 0;
    object-fit: cover;
  }

  &--placeholder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    background-color: var(--base--solid);
    color: var(--base--text-solid-foreground);
    user-select: none;
  }
}
</style>
