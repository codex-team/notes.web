<template>
  <div :class="$style['context-menu']">
    <div
      v-if="showSearch"
      :class="$style['context-menu__search']"
    >
      <Input />
      <div :class="$style['context-menu__sep-item']">
        <div :class="$style['context-menu__separator']" />
      </div>
    </div>
    <div :class="$style['context-menu__scrollable']">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="$style['context-menu__def-item']"
      >
        <div
          v-if="item.type === 'default'"
          :class="$style['context-menu__body']"
        >
          <Icon :name="item.icon" />
          <div>
            {{ item.title }}
          </div>
        </div>
        <div
          v-if="item.type === 'separator'"
          :class="$style['context-menu__sep-item']"
        >
          <div :class="$style['context-menu__separator']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '../input/Input.vue';
import Icon from '../icon/Icon.vue';
import { ContextMenuItems } from './ContextMenuTypes.types';

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
.context-menu {
  --h-padding: var(--spacing-ms);
  --v-padding: var(--spacing-xs);

  display: grid;
  width: max-content;
  gap: var(--spacing-very-x);

  &__search {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__separator {
    align-self: stretch;
    background: var(--base--border);
    height: var(--delimiter-height);
  }

  &__sep-item {
    padding-top: var(--spacing-very-x);
    padding-right: var(--spacing-xxs);
    padding-bottom: var(--spacing-very-x);
    padding-left: var(--spacing-xxs);
  }

  &__scrollable {
    display: grid;
    gap: var(--spacing-very-x);
  }

  &__def-item {
    gap: var(--v-padding);
    padding-top: var(--v-padding);
    padding-bottom: var(--v-padding);
    padding-left: var(--h-padding);
    padding-right: var(--h-padding);
  }

  &__body {
    display: flex;
    align-items: center;
    gap: var(--spacing-s);
  }
}
</style>
