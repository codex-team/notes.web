<template>
  <PageHeader>
    Icon
    <template #description>
      Symbol from the CodeX Icon Pack
    </template>
  </PageHeader>

  <div
    class="icons"
  >
    <Icon
      v-for="icon in icons"
      :key="icon"
      :name="icon.replace('Icon', '')"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Icon } from '../../../src/vue';
import * as iconMap from '@codexteam/icons';

const icons = Object.keys(iconMap);
</script>

<style scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1rem;
  max-width: 500px;
}
</style>
