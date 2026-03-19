"use client";

import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useState, useEffect } from "react";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="border-b border-gray-800 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter text-[#C7A36F]">
            ProofDrop.
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/verify" className="text-sm font-medium text-gray-300 hover:text-white transition">
              Verify
            </Link>

            {mounted && (isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 font-mono">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 text-sm font-medium border border-gray-700 rounded-md hover:bg-gray-800 transition"
                  >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: injected() })}
                className="px-4 py-2 text-sm font-medium bg-[#C7A36F] text-black rounded-md hover:bg-[#b08d5c] transition"
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
