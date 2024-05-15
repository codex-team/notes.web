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
import { useTheme, ColorScheme } from 'codex-ui/vue';

const { t } = useI18n();
const { colorScheme, setColorScheme } = useTheme();

/**
 * Change theme from dark/light to light/dark
 */
function changeTheme() {
  setColorScheme(colorScheme.value === ColorScheme.Light ? ColorScheme.Dark : ColorScheme.Light);
}
</script>

<style scoped></style>
