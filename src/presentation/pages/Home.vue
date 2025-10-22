<template>
  <!-- Unauthorized users -->
  <div v-if="user === null">
    <Container data-dimensions="large">
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
  </div>

  <!-- Authorized users -->
  <PageBlock v-else-if="user !== undefined" data-dimensions="large">
    <template #left>
      <VerticalMenu
        class="menu"
        :items="[verticalMenuItems]"
      />
    </template>

    <router-link
      v-if="user"
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

    <!-- Home content -->
    <template v-if="activeMenuItem === 'home'">
      <Heading
        :level="1"
        :class="$style['page-header']"
      >
        {{ $t('home.title') }}
      </Heading>
      <NoteList />
    </template>

    <!-- My notes content -->
    <template v-else-if="activeMenuItem === 'notes'">
      <Heading
        :level="1"
        :class="$style['page-header']"
      >
        My notes
      </Heading>
      <Container>
      </Container>
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

// Active menu item state
const activeMenuItem = ref('home');

const verticalMenuItems = computed<VerticalMenuItem>(() => {
  return {
    title: 'Navigation',
    isActive: false,
    items: [
      {
        title: t('home.title'),
        isActive: activeMenuItem.value === 'home',
        onActivate: () => {
          activeMenuItem.value = 'home';
        },
      },
      {
        title: 'My notes',
        isActive: activeMenuItem.value === 'notes',
        onActivate: () => {
          activeMenuItem.value = 'notes';
        },
      },
    ],
  };
});

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
