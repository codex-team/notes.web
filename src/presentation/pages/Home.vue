<template>
  <PageBlock
    data-dimensions="large"
  >
    <!-- Unauthorized users -->
    <template v-if="!user">
      <Container>
        <Row :title="t('home.authText')">
          <template #right>
            <Button
              @click="showGoogleAuthPopup"
            >
              {{ t('auth.login') }}
            </Button>
          </template>
        </Row>
      </Container>
    </template>

    <!-- Authorized users - menu -->
    <template
      v-if="user"
      #left
    >
      <VerticalMenu
        class="menu"
        :items="[verticalMenuItems]"
      />
    </template>

    <!-- Authorized users - content -->
    <template v-if="user">
      <router-link
        to="/new"
      >
        <Container>
          <div :class="$style['container__create-new-note']">
            <Row
              :title="t('home.createNewNote.title')"
              :subtitle="t('home.createNewNote.caption')"
            >
              <template #left>
                <Hammer />
              </template>
              <template #right>
                <Button
                  secondary
                  trailing-icon="ChevronRight"
                >
                  {{ t('home.createNewNote.button') }}
                </Button>
              </template>
            </Row>
          </div>
        </Container>
      </router-link>

      <Heading
        :level="1"
        :class="$style['page-header']"
      >
        {{ sectionTitle }}
      </Heading>
      <NoteList
        :key="activeMenuItem"
        :only-created-by-user="tabs[activeMenuItem].onlyCreatedByUser"
      />
    </template>
  </PageBlock>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import { Container, Row, Button, Heading, PageBlock, VerticalMenu, type VerticalMenuItem } from '@codexteam/ui/vue';
import Hammer from '../components/pictures/Hammer.vue';
import NoteList from '@/presentation/components/note-list/NoteList.vue';
import useAuth from '@/application/services/useAuth';
import { computed, ref } from 'vue';

const { user } = useAppState();
const { t } = useI18n();
const { showGoogleAuthPopup } = useAuth();

const tabs = {
  recents: {
    titleKey: 'home.sections.recents.title',
    onlyCreatedByUser: false,
  },
  myNotes: {
    titleKey: 'home.sections.myNotes.title',
    onlyCreatedByUser: true,
  },
};

type TabId = keyof typeof tabs;

const activeMenuItem = ref<TabId>('recents');
const sectionTitle = computed(() => t(tabs[activeMenuItem.value].titleKey));

const verticalMenuItems = computed<VerticalMenuItem>(() => ({
  title: t('home.navigation'),
  isActive: false,
  items: (Object.keys(tabs) as TabId[]).map(tabId => ({
    title: t(tabs[tabId].titleKey),
    isActive: activeMenuItem.value === tabId,
    onActivate: () => {
      activeMenuItem.value = tabId;
    },
  })),
}));

/**
 * Changing the title in the browser
 */
useHead({
  title: t('home.title'),
});
</script>

<style lang="postcss" module>
.container {
  display: grid;
  padding: var(--spacing-xxl) 0;
  gap: var(--spacing-xxl);

  &__create-new-note {
    padding: var(--v-padding) 0;
  }
}

.page-header {
  padding-top: var(--spacing-xxl);
}
</style>
