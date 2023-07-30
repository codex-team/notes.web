<template>
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
  position: fixed;
  left: var(--left);
  top: var(--top);
  font-style: italic;
  opacity: 0.7;
}
</style>
