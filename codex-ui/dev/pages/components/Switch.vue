<template>
  <PageHeader>
    Switch
    <template #description>
      Best used for activating or deactivating features or modes within an application. The change is usually effective immediately.
    </template>
  </PageHeader>

  <div class="showcase">
    on, default
    <Switch value />
    <br>
    on, disabled
    <Switch
      value
      disabled
    />
    <br>
    off, default
    <Switch />
    <br>
    off, disabled
    <Switch disabled />
  </div>
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Switch } from '../../../src/vue';

</script>

<style scoped>
.showcase {
  display: grid;
  gap: var(--spacing-l);
  grid-template-columns: repeat(1, max-content);
}
</style>
