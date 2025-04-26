<template>
  <PageHeader>
    Avatar
    <template #description>
      A component for displaying user profile pictures
    </template>
  </PageHeader>

  <Avatar
    src="https://i.pravatar.cc/300"
    username="Vitaly"
  />
</template>

<script setup lang="ts">
import PageHeader from '../../components/PageHeader.vue';
import { Avatar } from '../../../src/vue';

</script>

<style scoped>
</style>
