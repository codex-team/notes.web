<template>
  <PageBlock data-dimensions="large">
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
    <Heading
      v-if="user"
      :level="1"
      :class="$style['page-header']"
    >
      {{ $t('home.title') }}
    </Heading>

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
    <NoteList
      v-else-if="user !== undefined"
    />
  </PageBlock>
</template>

<script setup lang="ts">
import { useHead } from 'unhead';
import { useI18n } from 'vue-i18n';
import { useAppState } from '@/application/services/useAppState';
import { Container, Row, Button, Heading, PageBlock } from 'codex-ui/vue';
import Hammer from '../components/pictures/Hammer.vue';
import NoteList from '@/presentation/components/note-list/NoteList.vue';
import useAuth from '@/application/services/useAuth';

const { user } = useAppState();
const { t } = useI18n();
const { showGoogleAuthPopup } = useAuth();

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
  padding: var(--spacing-xxl) var(--h-padding) 0;
}
</style>
