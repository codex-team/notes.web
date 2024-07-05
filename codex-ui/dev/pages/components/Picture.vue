<template>
  <PageHeader>
    Picture
    <template #description>
      Component that will display picture by it's name
    </template>
  </PageHeader>

  <div
    :class="$style['pictures']"
  >
    <Picture
      v-for="(name, index) in pictureNames"
      :key="index"
      :name="name"
    />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Picture } from '../../../src/vue';

const pictureNames = ['Hammer', 'DarkTheme', 'LightTheme', 'SystemTheme', 'NotexLogo'];

</script>

<style lang="postcss" module>
.pictures {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 1rem;
}
</style>
