<template>
  <div class="header">
    <Tabs
      :tabs="tabs"
    />
    <Button
      class="header__plus"
      link="/new"
      type="transparent"
      :icon="IconPlus"
    />
    <LoginButton />
  </div>
</template>

<script lang="ts" setup>
import { IconPicture } from '@codexteam/icons';
import { IconPlus } from '@codexteam/icons';
import { useI18n } from 'vue-i18n';
import type Tab from '@/presentation/components/tabs/types/Tab';
import Tabs from '@/presentation/components/tabs/Tabs.vue';
import Button from '@/presentation/components/button/Button.vue';
import LoginButton from './HeaderLoginButton.vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const { t } = useI18n();
const { currentRoute } = useRouter();

const tabs = computed<Tab[]>(() => {
  return [
    {
      title: t('home.title'),
      path: '/',
      icon: IconPicture,
      isActive: currentRoute.value.name === 'home',
      isPinned: true,
    },
  ];
});
</script>

<style scoped lang="postcss">
.header {
  padding: var(--spacing-ms) var(--spacing-l);
  background-color: var(--color-bg-header);
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 100%;

  &__plus {
    margin-left: var(--spacing-ms);
  }

  &__login {
    margin-left: auto;
  }
}
</style>
