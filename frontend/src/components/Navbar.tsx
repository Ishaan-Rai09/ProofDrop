"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsClient } from "usehooks-ts";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export function Navbar() {
  const pathname = usePathname();
  const isClient = useIsClient();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#f6c17b]">
            ProofDrop.
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Dashboard
            </Link>
            <Link href="/verify" className="text-sm font-medium text-slate-300 transition hover:text-white">
              Verify
            </Link>

            {isClient && (isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-mono text-slate-400">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="rounded-full border border-white/[0.15] px-4 py-2 text-sm font-medium transition hover:bg-white/5"
                  >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: injected() })}
                className="rounded-full bg-[#f6c17b] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#ffd48b]"
                >
                Connect Wallet
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
