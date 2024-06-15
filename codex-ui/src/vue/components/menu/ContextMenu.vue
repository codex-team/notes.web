<template>
  <div :class="$style['context_menu']">
    <div
      v-if="showSearch"
      :class="$style['context_menu__search']"
    >
      <Input :class="$style['context_menu__input']" />
      <div :class="$style['context_menu__sep-item']">
        <div :class="$style['context_menu__separator']" />
      </div>
    </div>
    <div :class="$style['context_menu__scrollable']">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          v-if="item.type === 'default'"
          :class="[$style['context_menu__def-item']]"
        >
          <div :class="$style['context_menu__body']">
            <Icon
              v-if="item.icon !== undefined"
              :name="item.icon"
            />
            <div>
              {{ item.title }}
            </div>
          </div>
        </div>
        <div
          v-if="item.type === 'separator'"
          :class="$style['context_menu__sep-item']"
        >
          <div :class="$style['context_menu__separator']" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';
import Icon from '../icon/Icon.vue';
import type { ContextMenuItems } from './ContextMenuTypes.types.ts';

withDefaults(
  defineProps<{
    /**
     * If true, displays the input field for the search
     */
    showSearch?: boolean;

    /**
     * Array of items for context menu
     */
    items: ContextMenuItems[];
  }>(),
  { showSearch: false }
);
</script>

<style module>
.context_menu {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-very-x);
  width: min-content;

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__input {
    height: 32px;
  }

  &__separator {
    align-self: stretch;
    background: var(--base--border);
    height: var(--delimiter-height);
  }

  &__sep-item {
    padding: var(--spacing-very-x) var(--spacing-xxs);
  }

  &__scrollable {
    display: grid;
    width: max-content;
    gap: var(--spacing-very-x);
  }

  &__def-item {
    gap: var(--v-padding);
    border-radius: var(--radius-m);
    padding: var(--v-padding) var(--h-padding);
  }

  &__def-item:hover {
    background-color: var(--base--bg-secondary-hover);
    cursor: pointer;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: var(--size-icon);
    gap: var(--spacing-s);
  }
}
</style>
