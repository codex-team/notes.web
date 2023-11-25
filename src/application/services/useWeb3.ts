import { createSharedComposable } from '@vueuse/core';
import Onboard from '@web3-onboard/core'
// import { init as initWeb3Onboard, useOnboard } from '@web3-onboard/vue';
import injectedModule from '@web3-onboard/injected-wallets';


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


  // Only one RPC endpoint required per chain
  const rpcAPIKey = import.meta.env.VITE_RPC_API_KEY;
  const rpcUrl = `https://mainnet.infura.io/v3/${rpcAPIKey}`;

  const web3Onboard = Onboard({
    wallets: [ injected ],
    chains: [
      {
        id: '0x1',
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl,
      },
    ],
  });

  console.log('web3Onboard', web3Onboard);


  // if (connectedWallet) {
  // // if using ethers v6 this is:
  // // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  //   const ethersProvider = new ethers.providers.Web3Provider(
  //     connectedWallet.provider,
  //     'any'
  //   );
  // // ..... do stuff with the provider
  // }
  // }

  /**
   *
   */
  async function openModal(): Promise<void> {
    console.log('openModal');
    // const { connectWallet } = useOnboard();

    const wallets = await web3Onboard.connectWallet();

    console.log('wallets', wallets);
  }

  return {
    // init,
    openModal,
  };
});
