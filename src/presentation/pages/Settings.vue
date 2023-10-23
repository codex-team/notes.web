<template>
  <h1>{{ t('settings.title') }}</h1>
  <ThemeButton />
  <LogOutBtn/>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import LogOutBtn from '../components/button/LogOutBtn.vue';

const { t } = useI18n();
</script>

<style scoped>
</style>
