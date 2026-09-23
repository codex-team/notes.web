<template>
  <Section
    :title="t('noteSettings.sidebar.title')"
    :caption="t('noteSettings.sidebar.hint')"
    :with-background="false"
  >
    <div
      :class="['sidebar-setting', { 'sidebar-setting--disabled': disabled }]"
    >
      <div
        v-for="option in options"
        :key="option.value"
        :class="['sidebar-setting__card', { 'sidebar-setting__card--selected': sidebarPosition === option.value }]"
        @click="select(option.value)"
      >
        <div
          :class="[
            'sidebar-setting__preview',
            { 'sidebar-setting__preview--edge': option.value === 'edge' },
          ]"
        >
          <!-- No sidebar -->
          <template v-if="option.value === 'none'">
            <div class="sidebar-setting__content">
              <div
                class="sidebar-setting__line sidebar-setting__line--heading"
                style="width: 64px"
              />
              <div class="sidebar-setting__line" />
              <div class="sidebar-setting__line" />
              <div
                class="sidebar-setting__line"
                style="width: 60px"
              />
            </div>
          </template>

          <!-- Pinned to page edge -->
          <template v-else-if="option.value === 'edge'">
            <div class="sidebar-setting__bar sidebar-setting__bar--edge">
              <div class="sidebar-setting__line sidebar-setting__line--bar" />
              <div
                class="sidebar-setting__line sidebar-setting__line--bar"
                style="width: 16px"
              />
              <div
                class="sidebar-setting__line sidebar-setting__line--bar"
              />
            </div>
            <div class="sidebar-setting__preview-inner">
              <div class="sidebar-setting__content sidebar-setting__content--compact">
                <div
                  class="sidebar-setting__line sidebar-setting__line--heading"
                  style="width: 52px"
                />
                <div class="sidebar-setting__line" />
                <div class="sidebar-setting__line" />
                <div
                  class="sidebar-setting__line"
                  style="width: 48px"
                />
              </div>
            </div>
          </template>

          <!-- Pinned to content -->
          <template v-else>
            <div class="sidebar-setting__bar">
              <div class="sidebar-setting__line sidebar-setting__line--bar" />
              <div
                class="sidebar-setting__line sidebar-setting__line--bar"
                style="width: 16px"
              />
              <div
                class="sidebar-setting__line sidebar-setting__line--bar"
              />
            </div>
            <div class="sidebar-setting__content sidebar-setting__content--compact">
              <div
                class="sidebar-setting__line sidebar-setting__line--heading"
                style="width: 52px"
              />
              <div class="sidebar-setting__line" />
              <div class="sidebar-setting__line" />
              <div
                class="sidebar-setting__line"
                style="width: 48px"
              />
            </div>
          </template>
        </div>

        <div class="sidebar-setting__label">
          <div :class="['sidebar-setting__dot', { 'sidebar-setting__dot--selected': sidebarPosition === option.value }]">
            <div class="sidebar-setting__dot-inner" />
          </div>
          <div class="sidebar-setting__text">
            <span class="sidebar-setting__title">{{ t(option.title) }}</span>
            <span class="sidebar-setting__subtitle">{{ t(option.subtitle) }}</span>
          </div>
        </div>
      </div>
    </div>
    <p
      v-if="disabled"
      class="sidebar-setting__unavailable"
    >
      {{ t('noteSettings.sidebar.parentOnly') }}
    </p>
  </Section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Section } from '@codexteam/ui/vue';
import type { SidebarPosition } from '@/domain/entities/NoteSettings';

type SidebarOptionValue = SidebarPosition;

interface SidebarOption {
  value: SidebarOptionValue;
  title: string;
  subtitle: string;
}

const { t } = useI18n();

const props = defineProps<{
  /**
   * Sidebar position loaded from note settings
   */
  sidebarPosition: SidebarOptionValue;

  /**
   * Whether the sidebar position cannot be changed, e.g. for child notes
   */
  disabled?: boolean;
}>();

const emit = defineEmits<{
  /**
   * Fires when the sidebar position changes
   */
  (event: 'update:sidebarPosition', value: SidebarOptionValue): void;
}>();

const options: SidebarOption[] = [
  {
    value: 'none',
    title: 'noteSettings.sidebar.options.none.title',
    subtitle: 'noteSettings.sidebar.options.none.subtitle',
  },
  {
    value: 'edge',
    title: 'noteSettings.sidebar.options.edge.title',
    subtitle: 'noteSettings.sidebar.options.edge.subtitle',
  },
  {
    value: 'content',
    title: 'noteSettings.sidebar.options.content.title',
    subtitle: 'noteSettings.sidebar.options.content.subtitle',
  },
];

/**
 * Select and persist a sidebar position through the parent component
 *
 * @param value - selected sidebar position
 */
function select(value: SidebarOptionValue): void {
  if (props.disabled) {
    return;
  }

  emit('update:sidebarPosition', value);
}
</script>

<style setup lang="postcss" scoped>
.sidebar-setting {
  display: flex;
  flex-direction: row;
  gap: 12px;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__card {
    flex: 1;
    cursor: pointer;
    border-radius: 8px;
    background: var(--base--bg-primary);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: inset 0 0 0 1px var(--base--border);

    &--selected {
      box-shadow: inset 0 0 0 2px rgba(221, 32, 88, 1);
    }

    &:hover:not(&--selected) {
      background: var(--base--bg-secondary-hover);
    }
  }

  &__preview {
    height: 100px;
    border-radius: 6px;
    background: var(--base--solid-secondary);
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    padding: 10px;

    &--edge {
      padding: 0;
      gap: 0;
    }
  }

  &__preview-inner {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }

  &__content {
    width: 88px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 4px;

    &--compact {
      width: 74px;
    }
  }

  &__line {
    height: 5px;
    border-radius: 2px;
    background: rgba(116, 126, 136, 0.4);

    &--heading {
      height: 7px;
      background: rgba(116, 126, 136, 0.75);
    }

    &--bar {
      height: 4px;
      width: 24px;
      background: rgba(221, 32, 88, 0.55);

      &:first-child {
        width: auto;
        background: rgba(221, 32, 88, 0.85);
      }

      &:last-child {
        width: auto;
      }
    }
  }

  &__bar {
    width: 38px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    padding-top: 4px;

    &--edge {
      background: rgba(221, 32, 88, 0.16);
      border-right: 1px solid rgba(221, 32, 88, 0.45);
      padding: 10px 8px;
      align-self: stretch;
      box-sizing: border-box;
    }
  }

  &__label {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: flex-start;
  }

  &__dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 1px;
    box-shadow: inset 0 0 0 1.5px var(--base--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;

    &--selected {
      box-shadow: inset 0 0 0 1.5px rgba(221, 32, 88, 1);
    }

    &-inner {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: transparent;
    }

    &--selected .sidebar-setting__dot-inner {
      background: rgba(221, 32, 88, 1);
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    line-height: 1.2;
    color: var(--base--text);
  }

  &__subtitle {
    font-size: 12px;
    line-height: 1.35;
    color: var(--base--text-secondary);
  }

  &__unavailable {
    margin: var(--spacing-m) 0 0;
    font-size: 14px;
    line-height: 1.4;
    text-align: center;
    color: var(--base--text-secondary);
  }
}
</style>
