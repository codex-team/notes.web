<template>
  <div :class="$style.page">
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
    <Button />
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { Button } from 'design-system/ui';
import 'design-system/styles';

// console.log('s', s);




const { t } = useI18n();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
/* @import '@/presentation/styles/typography.pcss'; */
/* @import 'design-system/styles'; */

.page {
  /* background-color: var(--ds-color); */
}

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
