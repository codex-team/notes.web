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
  <Button
    :text="t('auth.logout')"
    type="primary"
    :icon="IconUnlink"
    @click="userLogout"
  />

  <div class="add-tool">
    <h2>
      🎡 Marketplace
    </h2>

    <h3>
      {{ t("userSettings.availableTools") }}
    </h3>
    <ul>
      <li
        v-for="tool in tools"
        :key="tool.id"
      >
        {{ tool.title }}
      </li>
    </ul>

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
import Button from '../components/button/Button.vue';
import { IconUnlink } from '@codexteam/icons';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import { useAppState } from '@/application/services/useAppState';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useHead } from 'unhead';
import useMarketplace from '@/application/services/useMarketplace';

const { userEditorTools } = useAppState();
const { tools } = useMarketplace();
const { t } = useI18n();
const router = useRouter();
const { logout } = useAuth();
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
/**
 * Logs out the user
 */
async function userLogout() {
  await logout().then(() => {
    router.push({ path: '/' });
  });
}

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
