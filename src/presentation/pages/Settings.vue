<template>
  <h1>{{ t("userSettings.title") }}</h1>
  <h2>{{ t("userSettings.userEditorTools") }}:</h2>
  <ul
    v-for="tool in userEditorTools"
    :key="tool.id"
  >
    <li>
      {{ tool.title }}
    </li>
  </ul>
  <ThemeButton />

  <div class="add-tool">
    <h2>
      🎡 Marketplace
    </h2>

    Insert Tool Id and press Enter:
    <input
      type="string"
      placeholder="Add tool by id"
      @keydown.enter="addTool"
    >
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import { useAppState } from '@/application/services/useAppState';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useHead } from 'unhead';

const { userEditorTools } = useAppState();
const { t } = useI18n();
const { addTool: addToolToUser } = useUserSettings();

/**
 * Add tool to user. Imitates Installations from the Marketplace
 *
 * @param event - keyboard event
 */
function addTool(event: KeyboardEvent): void {
  const input = event.target as HTMLInputElement;
  const toolId = input.value;

  if (toolId) {
    addToolToUser(toolId);
    input.value = '';
  }
}

/**
 * Changing the title in the browser
 */
useHead({
  title: t('userSettings.title'),
});
</script>

<style scoped>
@import '@/presentation/styles/typography.pcss';
.add-tool {
  margin-top: 100px;

  h2 {
    margin-bottom: var(--spacing-l);

    @apply --text-heading-2;
  }

  input {
    @apply --text-body;
    border: 1px solid var(--color-line);
    border-radius: var(--radius-s);
    padding: var(--spacing-xs) var(--spacing-ms);
    width: 100%;
    margin-top: var(--spacing-mm);
  }
}
</style>
