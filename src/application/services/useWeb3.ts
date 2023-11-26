import type { Chain } from '@wagmi/core';
import { getAccount, getWalletClient, mainnet, sepolia, type GetAccountResult, type WalletClient } from '@wagmi/core';
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal, useWeb3ModalEvents } from '@web3modal/wagmi/vue';
import { ref, watch } from 'vue';

/**
 * Tether USDT Stablecoin contract
 */
const stablecoinContract = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  abi: [
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
  ],
};

/**
 * Working with Web3Modal
 */
export function useWalletConnect(): {
  openModal: () => void;
  pay: () => void;
  } {
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

  const metadata = {
    name: 'NoteX',
    description: 'Knowledge presentation platform',
    url: 'https://notex.so',
  };

  const chains: Chain[] = [
    mainnet,
    sepolia,
  ];

  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
  });

  createWeb3Modal({
    wagmiConfig,
    chains,
    projectId,
  });

  const account = ref<GetAccountResult | null>(null);
  const walletClient = ref<WalletClient | null>(null);

  /**
   * Resolver for the promise returned by the openModal function
   * Resolved when the user has connected his wallet
   */
  let walletConnectResolver: null | (() => void) = null;

  /**
   * Hook called when the user has connected his wallet
   */
  async function onWalletConnected(): Promise<void> {
    walletClient.value = await getWalletClient({ chainId: 1 });

    if (walletConnectResolver !== null) {
      walletConnectResolver();

      walletConnectResolver = null;
    }
  }

  /**
   * Hook called when the user has disconnected his wallet
   */
  function onWalletDisconnected(): void {
    account.value = null;
    walletClient.value = null;
  }

  /**
   * Hook called when the error occurs during the modal process
   *
   * @param errorText Error text
   */
  function onModalError(errorText: string): void {
    console.log(errorText);
  }

  /**
   * Opens the modal and returns a promise that is resolved when the user has connected his wallet
   */
  async function openModal(): Promise<void> {
    return new Promise((resolve) => {
      walletConnectResolver = resolve;

      const modal = useWeb3Modal();

      void modal.open();

      /**
       * Web3Modal events. Changed when some action is performed in the modal
       */
      const event = useWeb3ModalEvents();

      /**
       * Watch for modal events to find out when the user has connected his wallet
       */
      const unwatchModalEvents = watch(event, async (newEvent) => {
        switch (newEvent.data.event) {
          case 'CONNECT_SUCCESS':
            await onWalletConnected();
            unwatchModalEvents();
            break;

          case 'DISCONNECT_SUCCESS':
            onWalletDisconnected();
            unwatchModalEvents();
            break;

          case 'CONNECT_ERROR':
            onModalError('Wallet connect error');
            unwatchModalEvents();

          case 'DISCONNECT_ERROR':
            onModalError('Wallet disconnect error');
            unwatchModalEvents();
            break;

          case 'MODAL_CLOSE':
            unwatchModalEvents();
            break;

          default:
            console.log(`Modal event: ${newEvent.data.event}`);
        }
      });
    });
  }

  /**
   * Method called when the user clicks on the pay button
   */
  async function pay(): Promise<void> {
    walletClient.value = await getWalletClient({ chainId: 1 });

    if (walletClient.value === null) {
      await openModal();
    }

    account.value = getAccount();

    /**
     * Price of the service
     */
    const price = 10000000n;

    await walletClient.value!.writeContract({
      account: account.value.address,
      address: stablecoinContract.address as `0x${string}`,
      abi: stablecoinContract.abi,
      functionName: 'transfer',
      args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', price],
    });
  }

  return {
    openModal,
    pay,
  };
}
