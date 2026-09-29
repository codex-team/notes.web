<template>
  <AppNavbar />
  <router-view />
  <Popover />
  <Popup />
  <Toasts />
</template>

<script lang="ts" setup>
import AppNavbar from '@/presentation/components/app-navbar/AppNavbar.vue';
import Toasts from '@/presentation/components/toast/Toasts.vue';
import { onErrorCaptured } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEventListener } from '@vueuse/core';
import { useTheme, Popover, Popup } from '@codexteam/ui/vue';
import useAuthRequired from '@/application/services/useAuthRequired';
import useToast from '@/application/services/useToast';
import DomainError from '@/domain/entities/errors/Base';

/**
 * Read theme from local storage and apply it
 */
useTheme();

/**
 * Check for authorization on appropriate routes
 */
useAuthRequired();

const { t } = useI18n();
const { showToast } = useToast();

/**
 * Tells the user that an action failed instead of failing silently
 *
 * @param error - error thrown by a click handler, a hook or an unawaited promise
 */
function reportError(error: unknown): void {
  /* eslint-disable-next-line no-console */
  console.error(error);

  if (error instanceof TypeError && /fetch|network|load failed/i.test(error.message)) {
    showToast(t('toast.networkError'));
  } else if (error instanceof DomainError) {
    showToast(t('toast.failedWithReason', { message: error.message }));
  } else {
    showToast(t('toast.failed'));
  }
}

onErrorCaptured((error) => {
  reportError(error);

  return false;
});

useEventListener(window, 'unhandledrejection', (event: PromiseRejectionEvent) => {
  event.preventDefault();
  reportError(event.reason);
});
</script>

<style lang="postcss">
html,
body {
  height: 100%;
  font-size: 16px;
}

#app {
  min-height: 100%;
  background: var(--base--bg-primary);
  color: var(--base--text);
  word-break: break-word;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
