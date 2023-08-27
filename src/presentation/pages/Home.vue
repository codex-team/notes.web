<template>
  <div class="page__block">
    <h1 class="page__title">
      Recent Notes
    </h1>
    <h2 class="page__title--2">
      What does it mean «block-styled editor»
    </h2>
    <h3 class="page__title--3">
      What does it mean «block-styled editor»
    </h3>
    <p class="page__content">
      Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.
    </p>
    <p class="page__content-small">
      Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

h2 {
  @apply --text-heading-2;
}

h3 {
  @apply --text-heading-3;
}

p {
  @apply --text-body;
}

.page__content-small {
  @apply --text-small;
}

</style>
