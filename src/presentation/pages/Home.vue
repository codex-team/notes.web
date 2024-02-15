<template>
  <div :class="$style.page">
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>

    <Heading
      :level="2"
    >
      CodeX UI showcase
    </Heading>
    <Button text="Button text" />
    <Input text="Input text" />
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { Button, Input, Heading } from 'codex-ui/vue';

const { t } = useI18n();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
.page {
  background-color: var(--ui-color);
}

h2 {
  @apply --text-heading-2;
}

p {
  @apply --text-body;
}

</style>
