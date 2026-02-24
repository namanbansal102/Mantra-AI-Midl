import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia, bscTestnet, opBNBTestnet } from 'wagmi/chains';

// Get WalletConnect project ID from environment variable
const projectId = 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Scam Detection',
  projectId: projectId,
  chains: [opBNBTestnet],
  ssr: false, // Disable SSR - wallet connection is client-only
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
