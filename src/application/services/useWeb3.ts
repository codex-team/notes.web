import {createSharedComposable} from '@vueuse/core';
import {init as initWeb3Onboard, useOnboard} from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
// import { mainnet } from 'viem/chains';
import type {Chain} from '@wagmi/core';
import {getAccount, getWalletClient, mainnet, sepolia} from '@wagmi/core';
import {createPublicClient, createWalletClient, custom, http} from 'viem';
// import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalSigner, useWeb3ModalAccount, useWeb3ModalState, useWeb3ModalEvents } from '@web3modal/ethers5/vue';
import {createWeb3Modal, defaultWagmiConfig, useWeb3Modal, useWeb3ModalState} from '@web3modal/wagmi/vue';
import {watch, watchEffect} from 'vue';
// import {useWeb3ModalAccount, useWeb3ModalSigner} from "@web3modal/ethers5/dist/types/exports/vue";

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
 * @param transport
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
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', 10000000n],
  });
}


/**
 * Working with Web3Modal
 */
export function useWalletConnect(): {
  openModal: () => void;
} {
  // console.log('first')
  // console.log(JSON.stringify(window.ethereum))
  const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

  // const sepolia = {
  //   chainId: 11155111,
  //   name: 'Ethereum',
  //   currency: 'ETH',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'https://cloudflare-eth.com',
  // };

  // const mainnetChain = {
  //   chainId: 1,
  //   name: 'Ethereum',
  //   currency: 'ETH',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'https://cloudflare-eth.com',
  // };

  // 3. Create modal
  const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com',
    icons: ['https://avatars.mywebsite.com/'],
  };

  const rpcAPIKey = import.meta.env.VITE_RPC_API_KEY;
  // const rpcUrl = `https://mainnet.infura.io/v3/${rpcAPIKey}`;

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

  const state = useWeb3ModalState();

  let walletConnectResolver: null | (() => void) = null;

  watch(state, async (newState, prevState) => {
    console.log('new state', newState.selectedNetworkId);
    console.log('prev state', prevState.selectedNetworkId);
    const account = getAccount();

    console.log(account.address);

    if (account.address && walletConnectResolver !== null){
      walletConnectResolver();
    }

  });

  // watchEffect(() => {
  //   const account = getAccount()
  //   console.log(account.address)
  // });

  // console.log('second')
  // console.log(JSON.stringify(window.ethereum))

  // const client = wagmiConfig.getPublicClient({chainId: 1})
  // requestTransaction(custom(window.ethereum), '0xFbDa07a729d5649Da74C58F8F01613FA842323fe');
  // const client = await getWalletClient({chainId: 1})
  // console.log({client})
  // if (client) {
  //   const walletClient = createWalletClient({
  //     account: address as `0x${string}`,
  //     chain: mainnet,
  //     transport: client.transport,
  //   });
  //
  //   await walletClient.writeContract({
  //     address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  //     abi: abi,
  //     functionName: 'transfer',
  //     args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', 10000000n],
  //   });
  // }

  // const { signer } = useWeb3ModalSigner();
  // const { address, chainId, isConnected } = useWeb3ModalAccount();
  //
  // requestTransaction(custom(signer.value.provider), address.value);


  /**
   * Called when the signer changes
   *  - after the user has connected their wallet
   *  - on disconnect
   */
  // watch(signer, async (newSigner, preSigner) => {
  //   console.log('new signer', newSigner);
  //   console.log('prev signer', preSigner);
  //
  //   if (!newSigner) {
  //     return;
  //   }
  //
  //
  //   const request = newSigner.provider.jsonRpcFetchFunc;
  //
  //   console.log('request', request );
  //   console.log('address', address.value);
  //
  //   const transport = custom({
  //     async request({ method, params }) {
  //       try {
  //         const response = await request(method, params);
  //
  //         console.log('response', response);
  //
  //         return response;
  //       } catch (error) {
  //         console.log('error', error);
  //       }
  //
  //       return undefined;
  //     },
  //   });
  //
  //   requestTransaction(transport, address.value);
  // });

  /**
   *
   */
  async function openModal(): Promise<void> {
    return new Promise((resolve) => {
      walletConnectResolver = resolve;

      const modal = useWeb3Modal();

      console.log('modal', modal);

      void modal.open();
    });
  }

  /**
   *
   */
  async function pay(): Promise<void> {
    const account = getAccount();

    console.log(account);
    let walletClient = await getWalletClient({chainId: 1});

    if (!walletClient) {
      console.log('wallet client not found');
      await openModal();
      walletClient = await getWalletClient({chainId: 1});
    }

    // const client = createWalletClient({
    //   chain: mainnet,
    //   transport: custom(window.ethereum)
    // })
    //
    // const [address] = await client.getAddresses()
    // console.log(address)
    //
    await walletClient.writeContract({
      account: account.address,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      abi: abi,
      functionName: 'transfer',
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', 10000000n],
    });
  }

  return {
    openModal,
    pay,
  };
}


export const useWeb3 = createSharedComposable(() => {
  /**
   * Initialize the web3 modal
   */
  const injected = injectedModule();
  const coinbaseWalletSdk = coinbaseWalletModule({darkMode: true});

  const wcInitOptions = {
    /**
     * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
     */
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    /**
     * Chains required to be supported by all wallets connecting to your DApp
     */
    requiredChains: [1],
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
    const {connectWallet, connectedWallet} = useOnboard();
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
