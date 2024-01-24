<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p class="hint">
      This page will contain your Notes you recently worked with
    </p>
    <div>
      <p class="btnHeadline">
        Base
      </p>
      <div class="buttons">
        <Button
          type="primary"
          text="Classic"
          @click="changeBaseTheme('theme-base-pure')"
        />
        <Button
          type="secondary"
          text="Crimson"
          @click="changeBaseTheme('theme-base-crimson')"
        />
        <Button
          type="primary"
          text="Violet"
          @click="changeBaseTheme('theme-base-violet')"
        />

        <Button
          type="secondary"
          text="Red"
          @click="changeBaseTheme('theme-base-red')"
        />
      </div>

      <p class="btnHeadline">
        Accent
      </p>
      <div class="buttons">
        <Button
          type="primary"
          text="Classic"
          @click="changeAccentTheme('theme-accent-classic')"
        />
        <Button
          type="secondary"
          text="Crimson"
          @click="changeAccentTheme('theme-accent-crimson')"
        />
        <Button
          type="primary"
          text="Violet"
          @click="changeAccentTheme('theme-accent-violet')"
        />

        <Button
          type="secondary"
          text="Red"
          @click="changeAccentTheme('theme-accent-red')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../components/button/Button.vue';
import themeService from '@/application/services/themeService';

const theme = themeService;
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

.hint {
  margin-bottom: 80px;
}

.btnHeadline {
  margin-top: 20px;
  margin-bottom: 8px;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
</style>

