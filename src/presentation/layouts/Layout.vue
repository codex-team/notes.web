<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import useLayout from '@/application/services/useLayout';

const layout = useLayout();
</script>

<style lang="postcss"></style>
