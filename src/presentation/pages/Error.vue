<template>
  <div :class="$style.error">
    <div :class="$style.code">
      {{ code }}
    </div>
    <div :class="$style.text">
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, te } = useI18n();

const props = withDefaults(
  defineProps<{
    /**
     * Visible error code
     */
    code?: number;

    /**
     * Error message to override default one got by code
     */
    customMessage?: string;
  }>(),
  {
    code: 500,
    customMessage: '',
  }
);

const message = computed(() => {
  if (props.customMessage) {
    return props.customMessage;
  }

  if (te(`errors.${props.code}`)) {
    return t(`errors.${props.code}`);
  }

  return t('errors.default');
});
</script>

<style lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.error {
  @apply --text-body;

  display: grid;
  grid-template-columns: auto 1fr;
  margin: auto;
  align-items: stretch;
}

.code {
  @apply --text-heading-3;
  border-right: 1px solid var(--color-text-main);
  padding-right: var(--spacing-ms);
  margin-right: var(--spacing-ms);
  line-height: 110%;
}
</style>
