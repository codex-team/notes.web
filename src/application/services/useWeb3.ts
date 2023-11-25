import { createSharedComposable } from '@vueuse/core';
import { init as initWeb3Onboard, useOnboard } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import { mainnet } from 'viem/chains';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalSigner, useWeb3ModalAccount, useWeb3ModalState, useWeb3ModalEvents } from '@web3modal/ethers5/vue';
import { watch } from 'vue';

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


/**
 *
 * @param provider
 * @param address
 */
async function requestTransaction(transport, address): void {
  const walletClient = createWalletClient({
    account: address as `0x${string}`,
    chain: mainnet,
    transport,
  });

  await walletClient.writeContract({
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: abi,
    functionName: 'transfer',
    args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', 10000000n],
  });
}


/**
 * Working with Web3Modal
 */
export function useWalletConnect(): {
  openModal: () => void;
  } {
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

  const sepolia = {
    chainId: 11155111,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  };

  const mainnetChain = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com',
  };

  // 3. Create modal
  const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: [ 'https://avatars.mywebsite.com/' ],
  };

  const rpcAPIKey = import.meta.env.VITE_RPC_API_KEY;
  const rpcUrl = `https://mainnet.infura.io/v3/${rpcAPIKey}`;


  createWeb3Modal({
    ethersConfig: defaultConfig({
      metadata,
      defaultChainId: 1,
      rpcUrl: 'https://cloudflare-eth.com',
      // rpcUrl,
    }),
    chains: [
      mainnetChain,
      sepolia,
    ],
    projectId,
  });

  const { signer } = useWeb3ModalSigner();
  const { address, chainId, isConnected } = useWeb3ModalAccount();


  /**
   * Called when the signer changes
   *  - after the user has connected their wallet
   *  - on disconnect
   */
  watch(signer, async (newSigner, preSigner) => {
    console.log('new signer', newSigner);
    console.log('prev signer', preSigner);

    if (!newSigner) {
      return;
    }


    const request = newSigner.provider.jsonRpcFetchFunc;

    console.log('request', request );
    console.log('address', address.value);

    const transport = custom({
      async request({ method, params }) {
        try {
          const response = await request(method, params);

          console.log('response', response);

          return response;
        } catch (error) {
          console.log('error', error);
        }

        return undefined;
      },
    });

    requestTransaction(transport, address.value);
  });

  /**
   *
   */
  async function openModal(): Promise<void> {
    const modal = useWeb3Modal();

    await modal.open();
  }

  return {
    openModal,
  };
}


export const useWeb3 = createSharedComposable(() => {
  /**
   * Initialize the web3 modal
   */
  const injected = injectedModule();
  const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

  const wcInitOptions = {
    /**
     * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
     */
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    /**
     * Chains required to be supported by all wallets connecting to your DApp
     */
    requiredChains: [ 1 ],
    /**
     * Chains required to be supported by all wallets connecting to your DApp
     */
    optionalChains: [42161, 8453, 10, 137, 56],
    /**
     * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
     * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
     * To connect with WalletConnect
     */
    dappUrl: 'http://YourAwesomeDapp.com',
  };

  const walletConnect = walletConnectModule(wcInitOptions);

  // Only one RPC endpoint required per chain
  const rpcAPIKey = import.meta.env.VITE_RPC_API_KEY;
  const rpcUrl = `https://mainnet.infura.io/v3/${rpcAPIKey}`;

  initWeb3Onboard({
    wallets: [
      injected,
      coinbaseWalletSdk,
      walletConnect,
    ],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl,
      },
    ],
  });

  /**
   *
   */
  async function openModal(): Promise<void> {
    const { connectWallet, connectedWallet } = useOnboard();
    const wallets = await connectWallet();

    if (connectedWallet !== null) {
      const transport = custom(connectedWallet.value?.provider!);
      const address = connectedWallet.value?.accounts[0].address;

      requestTransaction(transport, address);

      // const hash = await walletClient.sendTransaction({
      //   to: '0xFbDa07a729d5649Da74C58F8F01613FA842323fe',
      //   value: 50_000_000_000_000_000n
      // })
      // console.log({hash})
    }

    console.log('wallets', wallets);
  }

  return {
    openModal,
  };
});
