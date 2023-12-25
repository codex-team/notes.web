<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
    <my-btn>
      Example button
    </my-btn>
    <label for="themeSelect">Select Theme:</label>
    <select
      id="themeSelect"
      v-model="selectedTheme"
      @change="changeTheme"
    >
      <option value="default">
        Default
      </option>
      <option value="choco">
        Choco
      </option>
      <option value="graphite">
        Graphite
      </option>
      <option value="blue">
        Blue
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { setTheme } from '../../application/services/themeService';
import '../components/webComponents/button';
import { ref } from 'vue';

type ThemeName = 'default' | 'choco' | 'graphite' | 'blue';

const selectedTheme = ref<ThemeName>('default');

const changeTheme = () => {
  setTheme(selectedTheme.value);
};


/**
 * Toggle theme between default and choco
 */


</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
