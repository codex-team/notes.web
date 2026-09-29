<template>
  <PageBlock data-dimensions="large">
    <div :class="$style['settings']">
      <PageHeading>
        {{ t('userSettings.title') }}
      </PageHeading>

      <Section
        :title="t('userSettings.account')"
        :caption="t('userSettings.accountCaption')"
      >
        <Row
          v-if="user"
          :title="user.name"
          :subtitle="user.email"
        >
          <template #left>
            <Avatar
              :src="user.photo"
              :username="user.name"
            />
          </template>
          <template #right>
            <Button
              secondary
              @click="userLogout"
            >
              {{ t('auth.logout') }}
            </Button>
          </template>
        </Row>
      </Section>

      <Section
        :title="t('userSettings.appearance.colorSheme.title')"
        :with-background="false"
      >
        <div :class="$style['options']">
          <button
            v-for="scheme in colorSchemes"
            :key="scheme"
            :class="[$style['option'], colorScheme === scheme && $style['option--active'], 'text-ui-base-medium']"
            :aria-pressed="colorScheme === scheme"
            @click="setColorScheme(scheme)"
          >
            <LightColorShemeIcon v-if="scheme === ColorScheme.Light" />
            <DarkColorShemeIcon v-else />
            {{ t(`userSettings.appearance.colorSheme.${scheme}`) }}
          </button>
        </div>
      </Section>

      <Section
        v-for="scope in themeScopes"
        :key="scope.id"
        :title="t(`userSettings.appearance.${scope.id}Theme.title`)"
        :caption="t(`userSettings.appearance.${scope.id}Theme.caption`)"
        :with-background="false"
      >
        <div :class="$style['options']">
          <button
            v-for="theme in themes"
            :key="theme"
            :class="[$style['option'], scope.current.value === theme && $style['option--active'], 'text-ui-base-medium']"
            :aria-pressed="scope.current.value === theme"
            @click="scope.set(theme)"
          >
            <ThemePreview :theme="theme" />
            {{ capitalize(theme) }}
          </button>
        </div>
      </Section>

      <Section
        :title="t('userSettings.editorTools')"
        :caption="t('userSettings.editorToolsCaption')"
      >
        <Row
          v-for="tool in userEditorTools"
          :key="tool.id"
          :title="tool.title || tool.name"
          :subtitle="tool.description"
          has-delimiter
        >
          <template #left>
            <ToolIcon :title="tool.title || tool.name" />
          </template>
          <template #right>
            <span
              v-if="tool.isDefault"
              :class="[$style['tag'], 'text-ui-small']"
            >
              {{ t('marketplace.default') }}
            </span>
            <Button
              v-else
              secondary
              @click="uninstallClicked(tool.id, tool.title || tool.name)"
            >
              {{ t('userSettings.uninstallEditorTool') }}
            </Button>
          </template>
        </Row>
        <Row
          :title="t('userSettings.visitMarketplace.title')"
          :subtitle="t('userSettings.visitMarketplace.caption')"
        >
          <template #left>
            <Hammer />
          </template>
          <template #right>
            <Button
              secondary
              trailing-icon="ChevronRight"
              @click="router.push('/marketplace')"
            >
              {{ t('userSettings.visitMarketplace.button') }}
            </Button>
          </template>
        </Row>
      </Section>
    </div>
  </PageBlock>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Avatar, Button, Section, Row, useTheme, Theme, ColorScheme, ThemePreview, LightColorShemeIcon, DarkColorShemeIcon, PageBlock, useConfirm } from '@codexteam/ui/vue';
import { Hammer } from '@/presentation/components/pictures';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';
import ToolIcon from '@/presentation/components/marketplace/ToolIcon.vue';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useAppState } from '@/application/services/useAppState';
import usePageTitle from '@/application/services/usePageTitle';
import useNavbar from '@/application/services/useNavbar';

const { user, userEditorTools } = useAppState();
const { t } = useI18n();
const router = useRouter();
const { logout } = useAuth();
const { confirm } = useConfirm();
const { removeTool } = useUserSettings();
const { deleteOpenedPages } = useNavbar();
const { themeBase, themeAccent, colorScheme, setBaseTheme, setAccentTheme, setColorScheme } = useTheme();

const themes = Object.values(Theme);

const colorSchemes = Object.values(ColorScheme);

const themeScopes = [
  {
    id: 'base',
    current: themeBase,
    set: setBaseTheme,
  },
  {
    id: 'accent',
    current: themeAccent,
    set: setAccentTheme,
  },
];

/**
 * Makes the first letter uppercase
 *
 * @param text - text to capitalize
 * @returns {string} capitalized text
 */
function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

usePageTitle(() => t('userSettings.title'));

/**
 * Logs out the user
 */
async function userLogout() {
  await logout();

  deleteOpenedPages();

  void router.replace({ path: '/' });
}

/**
 * Deletes tool from the user
 *
 * @param toolId - id of the tool
 * @param title - tool title
 */
async function uninstallClicked(toolId: string, title: string) {
  const isConfirmed = await confirm(t('userSettings.uninstallEditorTool'), t('userSettings.toolUninstallConfirmation', { title }), {
    confirmText: t('userSettings.uninstallEditorTool'),
    cancelText: t('cancel'),
    destructive: true,
  });

  if (isConfirmed) {
    await removeTool(toolId);
  }
}
</script>

<style lang="postcss" module>
.settings {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-s);
}

.option {
  display: flex;
  align-items: center;
  gap: var(--spacing-m);
  padding: var(--spacing-s);
  border-radius: var(--radius-field);
  background-color: var(--base--bg-secondary);
  color: var(--base--text);
  font-family: inherit;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px transparent;

  svg {
    border-radius: var(--radius-m);
  }

  &:hover {
    background-color: var(--base--bg-secondary-hover);
  }

  &--active {
    box-shadow: inset 0 0 0 2px var(--accent--solid);
  }
}

.tag {
  padding: var(--spacing-xxs) var(--spacing-s);
  border-radius: var(--radius-s);
  background-color: var(--base--bg-secondary-hover);
  color: var(--base--text-secondary);
}
</style>
