<template>
  <PageHeader>
    Color Scheme
    <template #description>
      All themes has two color schemes: light and dark
    </template>
  </PageHeader>

  <Container data-dimensions="large">
    <Row
      v-for="mode in ['Dark', 'Light']"
      :key="mode"
      :title="mode"
      :has-delimiter="mode !== 'Light'"
      class="theme-row"
      @click="setColorScheme(mode.toLowerCase() as ColorScheme)"
    >
      <template
        v-if="colorScheme === mode.toLowerCase()"
        #right
      >
        <Icon name="Check" />
      </template>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { ColorScheme, useTheme } from '../../../src/vue/composables/useTheme';
import PageHeader from '../../components/PageHeader.vue';
import { Row, Container, Icon } from '../../../src/vue';

const { colorScheme, setColorScheme } = useTheme();
</script>
