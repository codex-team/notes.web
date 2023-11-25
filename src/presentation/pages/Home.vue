<script lang="ts" setup>
import { useWeb3ModalEvents, useWeb3ModalState } from '@web3modal/ethers5/vue';

const state = useWeb3ModalState()
const events = useWeb3ModalEvents()
</script>

<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>

    <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    <pre>{{ JSON.stringify(events, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
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
