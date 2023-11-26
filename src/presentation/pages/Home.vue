<script lang="ts" setup>
import {useWeb3ModalEvents, useWeb3ModalState} from '@web3modal/wagmi/vue';
import {createWalletClient, custom} from 'viem'
import {mainnet} from 'viem/chains'
import { getAccount, getWalletClient } from '@wagmi/core'



const state = useWeb3ModalState()
const events = useWeb3ModalEvents()

const abi = [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address',
      },
      {
        'name': '_value',
        'type': 'uint256',
      },
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool',
      },
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
];

</script>

<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>
    <p>This page will contain your Notes you recently worked with </p>

    <pre>{{ JSON.stringify(state, null, 2) }}</pre>
    <pre>{{ JSON.stringify(events, null, 2) }}</pre>
    <button @click="sendTx">send tx</button>
  </div>
</template>

<style lang="postcss" scoped>
@import '@/presentation/styles/typography.pcss';

h1 {
  @apply --text-heading-1;
}

p {
  @apply --text-body;
}

</style>
