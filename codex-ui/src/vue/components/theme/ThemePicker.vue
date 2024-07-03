<template>
  <Heading :level="2">
    {{ title }}
  </Heading>

  <Container data-dimensions="large">
    <Row
      v-for="theme in themes"
      :key="theme"
      :title="theme"
      :has-delimiter="theme !== themes[themes.length - 1]"
      class="theme-row"
      @click="setTheme(theme.toLowerCase() as Theme)"
    >
      <template #left>
        <div
          class="theme-preview"
          :theme-base="theme.toLowerCase()"
        />
      </template>
      <template
        v-if="actualTheme === theme.toLowerCase()"
        #right
      >
        <Icon name="Check" />
      </template>
    </Row>
  </container>
</template>

<script setup lang="ts">
import { themes, ThemeTypes } from './ThemePicker.types';
import { Heading, Row, Container, Icon } from '../../../';
import { type Theme, useTheme } from '../../composables/useTheme';

const { themeBase, themeAccent, setBaseTheme, setAccentTheme } = useTheme();

const props = defineProps<{
  title: string;
  themeType: ThemeTypes;
}>();

const actualTheme = props.themeType === 'Accent' ? themeAccent : themeBase;

function setTheme(theme: Theme) {
  if (props.themeType === 'Base') {
    setBaseTheme(theme);
  } else {
    setAccentTheme(theme);
  }
}
</script>

<style lang="postcss">
.theme-row {
  cursor: pointer;

  &:first-of-type {
    border-top-left-radius: var(--radius-field);
    border-top-right-radius: var(--radius-field);
  }

  &:last-of-type {
    border-bottom-left-radius: var(--radius-field);
    border-bottom-right-radius: var(--radius-field);
  }

  &:hover {
    background-color: var(--base--bg-secondary-hover);
  }
}

.theme-preview {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-field);
  background-color: var(--base--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: var(--radius-field);
    background-color: var(--base--solid);
  }
}
</style>
