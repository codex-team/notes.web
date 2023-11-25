import { createSharedComposable } from '@vueuse/core';
import { init as initWeb3Onboard, useOnboard } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import {mainnet} from "viem/chains";
import {createPublicClient, createWalletClient, custom, http} from "viem";

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
]

const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: '',
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
  dappUrl: 'http://YourAwesomeDapp.com'
}

export const useWeb3 = createSharedComposable(() => {
  // const projectId = 'b9edxxxxxxxxxxxxxxxxxx9';

  // 2. Set chains
  // const sepolia = {
  //   chainId: 11155111,
  //   name: 'Ethereum',
  //   currency: 'ETH',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'https://cloudflare-eth.com',
  // };

  // const mainnet = {
  //   chainId: 1,
  //   name: 'Ethereum',
  //   currency: 'ETH',
  //   explorerUrl: 'https://etherscan.io',
  //   rpcUrl: 'https://cloudflare-eth.com',
  // };

  // // 3. Create modal
  // const metadata = {
  //   name: 'My Website',
  //   description: 'My Website description',
  //   url: 'https://mywebsite.com',
  //   icons: [ 'https://avatars.mywebsite.com/' ],
  // };


  /**
   * Initialize the web3 modal
   */
  // function init(): void {
  const injected = injectedModule();

  console.log('injected', injected);

  const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

  const walletConnect = walletConnectModule(wcInitOptions)

  // Only one RPC endpoint required per chain
  const rpcAPIKey = import.meta.env.VITE_RPC_API_KEY;
  const rpcUrl = `https://mainnet.infura.io/v3/${rpcAPIKey}`;

  const web3Onboard = initWeb3Onboard({
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


  // if (web3Onboard.connectWallet) {
  // if using ethers v6 this is:
  // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  //   const ethersProvider = new ethers.providers.Web3Provider(
  //     connectedWallet.provider,
  //     'any'
  //   );
  // ..... do stuff with the provider

  //   const client = createPublicClient({
  //     chain: mainnet,
  //     transport: http(web3Onboard.state),
  //   })
  // }

  /**
   *
   */
  async function openModal(): Promise<void> {
    console.log('openModal');
    // const { connectWallet } = useOnboard();

    const { connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()
    const wallets = await connectWallet();

    if (connectedWallet) {
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      // const ethersProvider = new ethers.providers.Web3Provider(connectedWallet.provider, 'any')
      // ..... do stuff with the provider

      console.log('connectedWallet')
      console.log(connectedWallet)
      const client = createPublicClient({
        chain: mainnet,
        transport: custom(connectedWallet.value?.provider!),
      })

      const walletClient = createWalletClient({
        account: connectedWallet.value?.accounts[0].address as `0x${string}`,
        chain: mainnet,
        transport: custom(connectedWallet.value?.provider!)
      })

      const blockNumber = await client.getBlockNumber()
      console.log(blockNumber)

      await walletClient.writeContract({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: abi,
        functionName: 'transfer',
        args: ['0xFbDa07a729d5649Da74C58F8F01613FA842323fe', 10000000n],
      })

      // const hash = await walletClient.sendTransaction({
      //   to: '0xFbDa07a729d5649Da74C58F8F01613FA842323fe',
      //   value: 50_000_000_000_000_000n
      // })
      // console.log({hash})
    }

    console.log('wallets', wallets);
  }

  return {
    // init,
    openModal,
  };
});
