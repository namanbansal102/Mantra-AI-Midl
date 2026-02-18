import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

// Get WalletConnect project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Scam Detection',
  projectId: projectId,
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: true, // Enable SSR support for Next.js
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
