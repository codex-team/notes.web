<template>
  <div
    v-if="user === null"
    :class="$style['hero']"
  >
    <div
      :class="$style['hero__content']"
      data-dimensions="large"
    >
      <Logo :class="$style['hero__logo']" />
      <h1 :class="$style['hero__title']">
        {{ t('home.hero.title') }}
      </h1>
      <p :class="[$style['hero__text'], 'text-ui-large']">
        {{ t('home.hero.text') }}
      </p>
      <Button @click="showGoogleAuthPopup">
        {{ t('auth.continueWithGoogle') }}
      </Button>
    </div>
  </div>

  <div
    v-else-if="user"
    :class="$style['home']"
    data-dimensions="large"
  >
    <PageHeading>
      {{ t('home.notes') }}
      <template #actions>
        <Button
          icon="Plus"
          @click="router.push('/new')"
        >
          {{ t('note.new') }}
        </Button>
      </template>
    </PageHeading>

    <div
      :class="$style['home__filters']"
      role="tablist"
    >
      <button
        v-for="(tab, tabId) in tabs"
        :key="tabId"
        role="tab"
        :aria-selected="activeTab === tabId"
        :class="[$style['home__filter'], activeTab === tabId && $style['home__filter--active'], 'text-ui-base-medium']"
        @click="activeTab = tabId"
      >
        {{ t(tab.titleKey) }}
      </button>
    </div>

    <div :class="$style['home__list']">
      <NoteList
        :key="activeTab"
        :only-created-by-user="tabs[activeTab].onlyCreatedByUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { useAppState } from '@/application/services/useAppState';
import { Button } from '@codexteam/ui/vue';
import { Logo } from '@/presentation/components/pictures';
import NoteList from '@/presentation/components/note-list/NoteList.vue';
import PageHeading from '@/presentation/components/pageHeading/PageHeading.vue';
import useAuth from '@/application/services/useAuth';
import usePageTitle from '@/application/services/usePageTitle';

const { user } = useAppState();
const { t } = useI18n();
const router = useRouter();
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

const activeTab = useLocalStorage<TabId>('homeTab', 'recents');

if (!(activeTab.value in tabs)) {
  activeTab.value = 'recents';
}

usePageTitle(() => t('home.title'));
</script>

<style lang="postcss" module>
.home {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  &__filters {
    display: flex;
    gap: var(--spacing-xxs);
    padding: 0 calc(var(--h-padding) - var(--spacing-m));
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);
    padding: 0 var(--h-padding);
  }

  &__filter {
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-m);
    border-radius: var(--radius-m);
    color: var(--base--text-secondary);
    font-family: inherit;

    &:hover {
      color: var(--base--text);
    }

    &--active {
      color: var(--base--text);
      background-color: var(--base--bg-secondary-hover);
    }
  }
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxl) var(--spacing-xl);

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-l);
    max-width: 560px;
    text-align: center;
    margin-bottom: 10vh;
  }

  &__logo {
    width: 80px;
    height: 32px;
    margin-bottom: var(--spacing-s);
  }

  &__title {
    font-size: 2.8rem;
    line-height: 110%;
    font-weight: 700;
    color: var(--base--text);
  }

  &__text {
    color: var(--base--text-secondary);
    font-weight: 400;
    margin-bottom: var(--spacing-s);
  }
}
</style>
