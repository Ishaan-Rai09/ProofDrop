"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, polygonAmoy, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia, hardhat, polygonAmoy],
  connectors: [injected()],
  transports: {
    // USE YOUR ALCHEMY RPC HERE, fallback to default only if undefined
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL), 
    [hardhat.id]: http(),
    [polygonAmoy.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}