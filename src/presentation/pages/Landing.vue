<template>
  <div>
    <div v-if="note">
      <Editor :data="note.content" />
    </div>
    <div v-else-if="isLoading">
      Loading...
    </div>
    <div v-else>
      Note not found
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from '@/presentation/components/editor/Editor.vue';
import useNote from '@/application/services/useNote';

const { note, resolveHostname, isLoading } = useNote();

resolveHostname();
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
