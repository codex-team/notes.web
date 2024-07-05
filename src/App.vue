<template>
  <Header />
  <router-view />
  <Popover />
</template>

<script lang="ts" setup>
import Header from '@/presentation/components/header/Header.vue';
import { onErrorCaptured } from 'vue';
import { useTheme, Popover } from 'codex-ui/vue';

/**
 * Read theme from local storage and apply it
 */
useTheme();

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
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
