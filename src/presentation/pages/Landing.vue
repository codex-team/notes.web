<template>
  <div>
    <!-- <div v-if="note">
      <Editor :data="note.content" />
    </div>
    <div v-else-if="isLoading">
      Loading...
    </div>
    <div v-else>
      Note not found
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import Editor from '@/presentation/components/editor/Editor.vue';
// import useNote from '@/application/services/useNote';

/**
 * @todo re-implement fetching note by hostname
 * 1. Probably, it should use the same Note.vue component instead of Landing.vue
 * 2. Probably, useNote() should accept not only id but also hostname as a parameter
 * 3. Probably, you'll need to change onMounted() hook inside useNote() to make it work with the hostname as well
 */
// const { note, resolveHostname, isLoading } = useNote();

// resolveHostname();
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
