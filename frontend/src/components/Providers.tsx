"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, polygonAmoy } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [hardhat, polygonAmoy],
  connectors: [injected()],
  transports: {
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
