<template>
  <component :is="layout">
    <slot name="block-left" />
    <slot />
    <slot name="block-right" />
  </component>
</template>

<script lang="ts" setup>
import useLayout from '@/application/services/useLayout';

const layout = useLayout();
</script>

<style lang="postcss"></style>
