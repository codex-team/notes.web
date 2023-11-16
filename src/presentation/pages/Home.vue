<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('site.titles.home'),
});
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
