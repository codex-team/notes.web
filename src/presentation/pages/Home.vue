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
          @click="changeBaseTheme('Classic')"
        />
        <Button
          type="secondary"
          text="Crimson"
          @click="changeBaseTheme('Crimson')"
        />
        <Button
          type="primary"
          text="Violet"
          @click="changeBaseTheme('Violet')"
        />

        <Button
          type="secondary"
          text="Red"
          @click="changeBaseTheme('Red')"
        />
      </div>

      <p class="btnHeadline">
        Accent
      </p>
      <div class="buttons">
        <Button
          type="primary"
          text="Classic"
          @click="changeAccentTheme('Classic')"
        />
        <Button
          type="secondary"
          text="Crimson"
          @click="changeAccentTheme('Crimson')"
        />
        <Button
          type="primary"
          text="Violet"
          @click="changeAccentTheme('Violet')"
        />

        <Button
          type="secondary"
          text="Red"
          @click="changeAccentTheme('Red')"
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

