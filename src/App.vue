<template>
  <AppNavbar />
  <router-view />
  <Popover />
  <Popup />
</template>

<script lang="ts" setup>
import AppNavbar from '@/presentation/components/app-navbar/AppNavbar.vue';
import { onErrorCaptured } from 'vue';
import { useTheme, Popover, Popup } from '@codexteam/ui/vue';
import useAuthRequired from '@/application/services/useAuthRequired';

/**
 * Read theme from local storage and apply it
 */
useTheme();

/**
 * Check for authorization on appropriate routes
 */
useAuthRequired();

/**
 * All errors inside the application
 */
onErrorCaptured((error) => {
  /* eslint-disable-next-line no-console */
  console.error(error.message);
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
