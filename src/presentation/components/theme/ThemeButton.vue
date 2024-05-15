<template>
  <Button
    :text="t('userSettings.changeTheme')"
    :icon="IconReplace"
    @click="changeTheme"
  />
</template>

<script setup lang="ts">
import { IconReplace } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import Button from '@/presentation/components/button/Button.vue';
import { useTheme, ColorMode } from 'codex-ui/vue';

const { t } = useI18n();
const { colorMode, setColorMode } = useTheme();

/**
 * Change theme from dark/light to light/dark
 */
function changeTheme() {
  setColorMode(colorMode.value === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
}
</script>

<style scoped></style>
