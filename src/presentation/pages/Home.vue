<template>
  <div :class="$style.page">
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">
      <Heading :level="2"> CodeX UI showcase </Heading>
      <Button text="Button text" />
      <Input text="Input text" />
      <NoteList />
    </div>

    <div v-else>
      <p>{{ $t('home.authText') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { Button, Input, Heading } from 'codex-ui/vue';
import { useAppState } from '@/application/services/useAppState';
import NoteList from '@/presentation/components/note/NoteList.vue';

const { user } = useAppState();
const { t } = useI18n();

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.page {
  //background-color: var(--ui-color);
}

h2 {
  @apply --text-heading-2;
}

p {
  @apply --text-body;
}
</style>
