<template>
  <div :class="$style.page">
    <h1>{{ $t('home.title') }}</h1>
    <div v-if="user">
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
import { useAppState } from '@/application/services/useAppState';
import NoteList from '@/presentation/components/note-list/NoteList.vue';

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

h2 {
  @apply --text-heading-2;
}

p {
  @apply --text-body;
}
</style>
