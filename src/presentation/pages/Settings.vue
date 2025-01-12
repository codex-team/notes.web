<template>
  <ThreeColsLayout data-dimensions="large">
    <div :class="$style['page-header']">
      <Heading :level="1">
        {{ t('userSettings.title') }}
      </Heading>
    </div>
    <div
      :class="$style['container']"
    >
      <Fieldset :title="t('userSettings.general')">
        <div :class="$style['container__general-fields']">
          <Section
            :title="t('userSettings.name')"
            :caption="t('userSettings.nameCaption')"
          >
            <Input
              disabled
              :placeholder="user?.name!"
            />
          </Section>
          <Section
            :title="t('userSettings.email')"
            :caption="t('userSettings.emailCaption')"
          >
            <Input
              disabled
              :placeholder="user?.email!"
            />
          </Section>
          <div>
            <Button
              destructive
              @click="userLogout"
            >
              {{ t('auth.logout') }}
            </Button>
          </div>
        </div>
      </Fieldset>

      <Fieldset :title="t('userSettings.appearance.title')">
        <div :class="$style['container__appearance']">
          <Section
            :title="t('userSettings.appearance.colorSheme.title')"
            :caption="t('userSettings.appearance.colorSheme.caption')"
          >
            <Row
              v-for="scheme in colorSchemes"
              :key="scheme"
              :title="scheme"
              :has-delimiter="scheme !== colorSchemes[colorSchemes.length - 1]"
              :class="$style['container__appearance-theme-row']"
              @click="setColorScheme(scheme.toLowerCase() as ColorScheme)"
            >
              <template #left>
                <LightColorShemeIcon v-if="scheme === 'Light'" />
                <DarkColorShemeIcon v-if="scheme === 'Dark'" />
              </template>
              <template
                v-if="colorScheme === scheme.toLowerCase()"
                #right
              >
                <Icon name="Check" />
              </template>
            </Row>
          </Section>

          <Section
            :title="t('userSettings.appearance.baseTheme.title')"
            :caption="t('userSettings.appearance.baseTheme.caption')"
          >
            <Row
              v-for="theme in themes"
              :key="theme"
              :title="theme"
              :has-delimiter="theme !== themes[themes.length - 1]"
              :class="$style['container__appearance-theme-row']"
              @click="setBaseTheme(theme.toLowerCase() as Theme)"
            >
              <template #left>
                <ThemePreview :theme="theme" />
              </template>
              <template
                v-if="themeBase === theme.toLowerCase()"
                #right
              >
                <Icon name="Check" />
              </template>
            </Row>
          </Section>

          <Section
            :title="t('userSettings.appearance.accentTheme.title')"
            :caption="t('userSettings.appearance.accentTheme.caption')"
          >
            <Row
              v-for="theme in themes"
              :key="theme"
              :title="theme"
              :has-delimiter="theme !== themes[themes.length - 1]"
              :class="$style['container__appearance-theme-row']"
              @click="setAccentTheme(theme.toLowerCase() as Theme)"
            >
              <template #left>
                <ThemePreview :theme="theme" />
              </template>
              <template
                v-if="themeAccent === theme.toLowerCase()"
                #right
              >
                <Icon name="Check" />
              </template>
            </Row>
          </Section>
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
          <Container>
            <div :class="$style['container__editor-tools-visit-marketplace']">
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
                    @click="$router.push('/marketplace')"
                  >
                    {{ t('userSettings.visitMarketplace.button') }}
                  </Button>
                </template>
              </Row>
            </div>
          </Container>
        </div>
      </Fieldset>
    </div>
  </ThreeColsLayout>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Button, Fieldset, Section, Row, Heading, Card, useTheme, Theme, ColorScheme, ThemePreview, Icon, LightColorShemeIcon, DarkColorShemeIcon, Container, Input } from 'codex-ui/vue';
import { Hammer } from '@/presentation/components/pictures';
import { useRouter } from 'vue-router';
import useAuth from '@/application/services/useAuth';
import { useUserSettings } from '@/application/services/useUserSettings';
import { useAppState } from '@/application/services/useAppState';
import { useHead } from 'unhead';
import { ref } from 'vue';
import useNavbar from '@/application/services/useNavbar';
import ThreeColsLayout from '@/presentation/layouts/ThreeColsLayout.vue';

const { user, userEditorTools } = useAppState();
const { t } = useI18n();
const router = useRouter();
const { logout } = useAuth();
const { removeTool } = useUserSettings();
const { deleteOpenedPageByUrl } = useNavbar();
const { themeBase, themeAccent, colorScheme, setBaseTheme, setAccentTheme, setColorScheme } = useTheme();

/**
 * To make themes iterable because Theme is enum
 */
const themes = Object.keys(Theme);

/**
 * To make colorShemes iterable because colorSheme is enum
 */
const colorSchemes = Object.keys(ColorScheme);

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
  await logout();

  /**
   * Delete user opened page
   */
  deleteOpenedPageByUrl('/settings');

  router.replace({ path: '/' });
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

<style lang="postcss" module>
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

    &-visit-marketplace {
      padding: var(--v-padding) 0;
    }
  }

  &__appearance {
    display: grid;
    gap: var(--spacing-xxl);

    &-theme-row {
      cursor: pointer;

      :global(.codex-row__center) {
        min-height: 20px;
      }

      &:first-of-type {
        border-top-left-radius: var(--radius-field);
        border-top-right-radius: var(--radius-field);
      }

      &:last-of-type {
        border-bottom-left-radius: var(--radius-field);
        border-bottom-right-radius: var(--radius-field);
      }

      &:hover {
        background-color: var(--base--bg-secondary-hover);
      }
    }
  }
}

.page-header {
  padding: 0 var(--h-padding);
  gap: var(--spacing-s);
}
</style>
