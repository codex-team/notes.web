<template>
  <div :class="$style['page-header']">
    <Heading :level="1">
      {{ t('userSettings.title') }}
    </Heading>
  </div>
  <div :class="$style['container']">
    <Fieldset :title="t('userSettings.general')">
      <div :class="$style['container__general-fields']">
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

    <Fieldset :title="t('userSettings.editorTools')">
      <div :class="$style['container__editor-tools']">
        <Card
          v-for="tool in userEditorTools"
          :key="tool.id"
          :title="tool.name"
          subtitle="Lorem ipsum, waiting for description setup..."
          src="https://sun9-50.userapi.com/c844720/v844720274/194ada/1HCPufLxhzY.jpg"
          orientation="horizontal"
        >
          <Button
            v-if="!tool.isDefault"
            @click="uninstallClicked(tool.id)"
          >
            {{ t('userSettings.uninstallEditorTool') }}
          </Button>
        </Card>
      </div>
    </Fieldset>
  </div>

  <ThemeButton />
  <Button
    :text="t('auth.logout')"
    type="primary"
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
import { Button, Fieldset, Section, Row, Heading, Card } from 'codex-ui/vue';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';
import { useUserSettings } from '@/application/services/useUserSettings';
import ThemeButton from '@/presentation/components/theme/ThemeButton.vue';
import { useAppState } from '@/application/services/useAppState';
import { useHead } from 'unhead';
import { ref } from 'vue';
import useHeader from '@/application/services/useHeader';

const { user, userEditorTools } = useAppState();
const { t } = useI18n();
const router = useRouter();
const { logout } = useAuth();
const { removeTool } = useUserSettings();
const { deleteOpenedPageByUrl } = useHeader();

const isLoading = ref<boolean>(false);

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
    isLoading.value = true;

    await removeTool(toolId);

    isLoading.value = false;
  }
}
</script>

<style scoped lang="postcss" module>
@import '@/presentation/styles/typography.pcss';

.container {
  display: grid;
  padding: var(--spacing-xxl) 0;
  gap: var(--spacing-xxl);

  &__general-fields {
    display: grid;
    gap: var(--spacing-xxl);
  }

  &__editor-tools {
    display: grid;
    gap: var(--v-padding);
  }
}

.page-header {
  padding: 0 var(--h-padding);
  gap: var(--spacing-s);
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
