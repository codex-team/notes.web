<template>
  <h1>{{ t("settings.title") }}</h1>
  <h2>{{ t("settings.userEditorTools") }}:</h2>
  <ul
    v-for="tool in userEditorTools"
    :key="tool.id"
  >
    <li>
      {{ tool.title }}
    </li>
  </ul>
  <ThemeButton />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import { useAppState } from '@/application/services/useAppState';

const { userEditorTools } = useAppState();

const { t } = useI18n();
</script>

<style scoped></style>
