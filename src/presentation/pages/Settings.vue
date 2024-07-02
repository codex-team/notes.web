<template>
  <div :class="$style['page-header']">
    <Heading :level="1">
      {{ t('userSettings.title') }}
    </Heading>
  </div>
  <Fieldset :title="t('userSettings.general')">
    <div :class="$style['page-header__general-fields']">
      <Section
        :title="t('userSettings.name')"
        :caption="t('userSettings.nameCaption')"
      >
        <Row :title="user?.name!" />
      </Section>
      <Section
        :title="t('userSettings.email')"
        :caption="t('userSettings.emailCaption')"
      >
        <Row :title="user?.email!" />
      </Section>
      <div>
        <Button destructive>
          {{ t('auth.logout') }}
        </Button>
      </div>
    </div>
  </Fieldset>
  <h2>{{ t('userSettings.userEditorTools') }}:</h2>
  <ul
    v-for="tool in userEditorTools"
    :key="tool.id"
  >
    <li :class="$style.tool">
      {{ tool.title }}
      <Button
        v-if="tool.isDefault === false"
        :text="t('userSettings.uninstallEditorTool')"
        @click="uninstallClicked(tool.id)"
      />
    </li>
  </ul>
  <ThemeButton />
  <Button
    :text="t('auth.logout')"
    type="primary"
    :icon="IconUnlink"
    @click="userLogout"
  />

  <Button
    class="marketplace"
    :text="t('marketplace.title')"
    link="/marketplace"
    type="primary"
  />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Button, Fieldset, Section, Row, Heading } from 'codex-ui/vue';
import { IconUnlink } from '@codexteam/icons';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';
import { useUserSettings } from '@/application/services/useUserSettings';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import { useAppState } from '@/application/services/useAppState';
import { useHead } from 'unhead';
import useHeader from '@/application/services/useHeader';

const { user, userEditorTools } = useAppState();
const { t } = useI18n();
const router = useRouter();
const { logout } = useAuth();
const { removeTool } = useUserSettings();
const { deleteOpenedPageByUrl } = useHeader();

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

    /**
     * Delete user settings
     */
    deleteOpenedPageByUrl('/settings');
  });
}

/**
 * Deletes tool from the user
 *
 * @param toolId - id of the tool
 */
async function uninstallClicked(toolId: string) {
  if (window.confirm(t('userSettings.toolUninstallConfirmation'))) {
    await removeTool(toolId);
  }
}
</script>

<style scoped lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.page-header {
  padding: 0 var(--h-padding);
  gap: var(--spacing-s);
  color: var(--base--text);

  h1 {
    font-size: 42px;
    font-weight: 700;
    line-height: 46.2px;
  }

  &__general-fields {
    display: grid;
    gap: var(--spacing-xxl);
  }
}

.marketplace {
  margin-top: var(--spacing-l);
}

.tool {
  display: flex;
  align-items: center;
  gap: var(--spacing-very-x);
}
</style>
