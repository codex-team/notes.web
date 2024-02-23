<template>
  <Button
    :text="t('userSettings.changeTheme')"
    :icon="IconReplace"
    @click="changeTheme"
  />
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { IconReplace } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import Button from '@/presentation/components/button/Button.vue';

const { t } = useI18n();
const mode = useColorMode();

/**
 * Change theme from dark/light to light/dark
 */
function changeTheme() {
  mode.value = useColorMode().value === 'light' ? 'dark' : 'light';
}
</script>

<style scoped></style>
