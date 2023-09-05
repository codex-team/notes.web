<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="isDisplayed"
    class="suggest ce-paragraph"
    :style="styles"
    v-html="text"
  />
</template>

<script lang='ts' setup>
import useSuggestions from '@/application/services/useSuggestions';

const { isDisplayed, text, styles } = useSuggestions();

</script>

<style lang="postcss">
.suggest {
  font-size: var(--font-size);
  line-height: var(--line-height) !important;
  left: var(--left);
  top: var(--top);

  position: fixed;

  font-style: italic;
  opacity: 0.5;

  width: 100%;
  max-width: 650px;
  margin: 0 auto;
}
</style>
