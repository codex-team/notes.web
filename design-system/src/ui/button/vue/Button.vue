<template>
  <div>
    <button :class="$style.button">
      Button Text
    </button>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="postcss" module>
@import url('@/styles/typography.pcss');
.button {
  border: 1px solid green;

  @apply --text-heading-1;

  background-color: var(--ds-color);

  -webkit-appearance: button;

}

</style>
