<template>
  <h1>{{ t('settings.title') }}</h1>
  <ThemeButton />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';

const { t } = useI18n();
</script>

<style scoped>
</style>
