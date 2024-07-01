<template>
  <component
    :is="link !== undefined ? 'a' : 'div'"
    ref="tabElement"
    :href="link"
    :class="[
      $style.tab,
      'text-ui-base-medium',
      isActive && $style['tab--active']
    ]"
  >
    <div
      :class="[
        $style['tab__body'],
      ]"
    >
      <template v-if="picture">
        <img
          :src="picture"
          :class="[$style['tab__body-image']]"
        >
      </template>
      <template v-else-if="icon">
        <div :class="[$style['tab__body-icon']]">
          <Icon
            :name="icon"
            :width="20"
            :height="20"
          />
        </div>
      </template>
      <div :class="[$style['tab__body-text']]">
        {{ title }}
      </div>
      <Icon
        v-if="closable && isActive"
        name="Cross"
        :class="$style['tab__body-cross']"
        @click.stop="$emit('close')"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import Icon from '../icon/Icon.vue';
import { TabParams } from './Tab.types';

defineEmits([
  /**
   * This emit will be triggered when cross is pressed
   */
  'close',
]);

withDefaults(
  defineProps<TabParams>(),
  {
    isActive: false,
    picture: undefined,
    icon: undefined,
    closable: false,
  }
);
</script>

<style module>
.tab {
  --tab-text-max-width: 200px;
  --min-width: calc(var(--h-padding) * 2 + var(--size-icon));
  padding: var(--v-padding) 0;
  position: relative;
  display: inline-block;
  min-width: var(--min-width);
  text-decoration: none;

  max-width: max-content;

  flex: 1;
  flex-shrink: 1;

  &__body {
    min-height: var(--size-icon);
    display: flex;
    gap: var(--v-padding);
    border-radius: var(--radius-m);
    cursor: pointer;
    max-width: 100%;
    font-family: inherit;

    padding: var(--v-padding) var(--h-padding);
    background-color: var(--bg);
    color: var(--color);

    --bg: var(--base--bg-secondary);
    --color: var(--base--text-secondary);

    /**
     * States
     */
    &:hover {
      --bg: var(--base--bg-secondary-hover);
    }

    &-image {
      height: var(--size-icon);
      width: var(--size-icon);
      border-radius: var(--radius-s);
    }

    &-icon {
      height: var(--size-icon);
      width: var(--size-icon);
    }

    &-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-clamp: 1;
      max-width: var(--tab-text-max-width);
    }

    &-cross {
      &:hover {
        background: var(--base--bg-secondary);
        border-radius: var(--radius-s);
      }
    }
  }

  &--active {
    min-width: max-content;
  }

  &--active .tab__body {
    --bg: var(--base--bg-secondary-hover);
    --color: var(--base--text);

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: var(--spacing-very-x);
      background-color: var(--accent--solid);
      border-radius: var(--radius-s) var(--radius-s) 0 0;
    }
  }
}
</style>
