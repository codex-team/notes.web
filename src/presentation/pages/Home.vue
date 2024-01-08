<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>
    <div>
      <p>Accent</p>
      <button @click="changeAccentTheme('Classic')">
        Classic
      </button>
      <button @click="changeAccentTheme('Crimson')">
        Crimson
      </button>
      <button @click="changeAccentTheme('Violet')">
        Violet
      </button>
      <button @click="changeAccentTheme('Red')">
        Red
      </button>
    </div>
    <p>Base</p>
    <button @click="changeBaseTheme('Classic')">
      Classic
    </button>
    <button @click="changeBaseTheme('Crimson')">
      Crimson
    </button>
    <button @click="changeBaseTheme('Violet')">
      Violet
    </button>
    <button @click="changeBaseTheme('Red')">
      Red
    </button>
  </div>
</template>

<script setup lang="ts">
import { Ref, inject } from 'vue';


interface ThemeService {
  currentBaseTheme: Ref<string>;
  currentAccentTheme: Ref<string>;
  // eslint-disable-next-line no-unused-vars
  setBaseTheme: (baseThemeName:string) =>void;
  // eslint-disable-next-line no-unused-vars
  setAccentTheme: (accentThemeName:string)=> void;
  getThemeFromLocalStorage: () => { baseTheme: string | null, accentTheme: string | null };
  applyTheme: () => void;
}

const theme = inject<ThemeService>('theme');

const changeBaseTheme = (baseThemeName:string) => {
  if (theme) {
    theme.setBaseTheme(baseThemeName);
  } else {
    console.error('ThemeService is not provided');
  }
};

const changeAccentTheme = (accentTheme:string) => {
  if (theme) {
    theme.setAccentTheme(accentTheme);
  } else {
    console.error('ThemeService is not provided');
  }
};


</script>

<style>

</style>

