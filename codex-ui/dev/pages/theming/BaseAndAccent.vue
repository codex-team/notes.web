<template>
  <PageHeader>
    Base and Accent
    <template #description>
      We have several themes. Each of them can be used as a Base or Accent use case. Base use case is used for the main background and text colors. Accent use case is used for the accent colors like primary buttons, highlights, etc.
    </template>
  </PageHeader>

  <Heading :level="2">
    Base Theme
  </Heading>

  <Container data-dimensions="large">
    <Row
      v-for="theme in themes"
      :key="theme"
      :title="theme"
      :has-delimiter="theme !== themes[themes.length - 1]"
      class="theme-row"
      @click="setBaseTheme(theme.toLowerCase() as Theme)"
    >
      <template #left>
        <ThemePreview :theme="theme" />
      </template>
      <template
        v-if="themeBase === theme.toLowerCase()"
        #right
      >
        <Icon name="Check" />
      </template>
    </Row>
  </Container>

  <Heading :level="2">
    Accent Theme
  </Heading>

  <Container data-dimensions="large">
    <Row
      v-for="theme in themes"
      :key="theme"
      :title="theme"
      :has-delimiter="theme !== themes[themes.length - 1]"
      class="theme-row"
      @click="setAccentTheme(theme.toLowerCase() as Theme)"
    >
      <template #left>
        <ThemePreview :theme="theme" />
      </template>
      <template
        v-if="themeAccent === theme.toLowerCase()"
        #right
      >
        <Icon name="Check" />
      </template>
    </Row>
  </container>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Heading, Row, Container, Icon, ThemePreview } from '../../../src/vue';
import { Theme, useTheme } from '../../../src/vue/composables/useTheme';

const { themeBase, themeAccent, setBaseTheme, setAccentTheme } = useTheme();

/**
 * To make themes iterable because Theme is enum
 */
const themes = Object.values(Theme);

</script>

<style scoped>

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
