"use client";

import Link from "next/link";
import { startTransition, useEffect, useState } from "react";
import {
  ArrowRight,
  Blocks,
  Compass,
  PackageCheck,
  Radar,
  ShieldCheck,
  Signature,
  Wallet,
} from "lucide-react";
import { useIsClient } from "usehooks-ts";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { AppleStyleDock } from "@/components/ui/proofdrop-dock";

const tabs = [
  { title: "Workflow", icon: Compass },
  { title: "Telemetry", icon: Radar },
  { title: "Trust", icon: ShieldCheck },
  { title: "Footer", icon: Signature },
];

const stats = [
  { label: "Wallet signed receipt", value: "100%" },
  { label: "Roles separated on-chain", value: "3" },
  { label: "Shared proof timeline", value: "24/7" },
];

const signalCards = [
  {
    title: "Live chain state",
    description: "Every package mutation is preserved in the contract history.",
    icon: Blocks,
  },
  {
    title: "GPS-linked updates",
    description: "Agents can broadcast coordinates alongside the latest status.",
    icon: Radar,
  },
  {
    title: "Receiver confirmation",
    description: "Final delivery closes only when the receiver signs with their wallet.",
    icon: Wallet,
  },
];

export function Web3HeroAnimated() {
  const pillars = [92, 84, 78, 70, 62, 54, 46, 34, 18, 34, 46, 54, 62, 70, 78, 84, 92];
  const [isMounted, setIsMounted] = useState(false);

  const isClient = useIsClient();
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (index: number | null) => {
    const ids = ["workflow", "signals", "testimonials", "footer"];
    const targetId = index === null ? null : ids[index];

    if (!targetId) {
      return;
    }

    startTransition(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes subtlePulse {
            0%, 100% {
              opacity: 0.8;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.03);
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>

      <section className="relative isolate min-h-screen overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: [
              "radial-gradient(80% 55% at 50% 52%, rgba(255,188,155,0.45) 0%, rgba(226,94,91,0.42) 27%, rgba(54,36,56,0.40) 47%, rgba(38,53,95,0.50) 60%, rgba(8,8,12,0.92) 78%, rgba(0,0,0,1) 88%)",
              "radial-gradient(85% 60% at 14% 0%, rgba(255,210,171,0.55) 0%, rgba(255,127,90,0.42) 30%, rgba(48,24,28,0.0) 64%)",
              "radial-gradient(70% 50% at 86% 22%, rgba(88,169,255,0.30) 0%, rgba(16,18,28,0.0) 55%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0) 40%)",
            ].join(","),
            backgroundColor: "#000",
          }}
        />

        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(140%_120%_at_50%_0%,transparent_60%,rgba(0,0,0,0.85))]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen opacity-30"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0 1px, transparent 1px 96px)",
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 24px)",
              "repeating-radial-gradient(80% 55% at 50% 52%, rgba(255,255,255,0.08) 0 1px, transparent 1px 120px)",
            ].join(","),
            backgroundBlendMode: "screen",
          }}
        />

        <header className="relative z-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 md:px-8 xl:flex-row xl:items-center xl:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">ProofDrop</p>
                <p className="text-xs uppercase tracking-[0.24em] text-white/[0.45]">
                  Delivery proof layer
                </p>
              </div>
            </Link>

            <ExpandableTabs
              tabs={tabs}
              onChange={scrollToSection}
              activeColor="text-white"
              className="hidden xl:flex"
            />

            <div className="flex items-center gap-3">
              {isClient ? (
                isConnected ? (
                <>
                  <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 md:block">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                  <button
                    onClick={() => disconnect()}
                    className="rounded-full border border-white/[0.15] px-4 py-2 text-sm text-white/80 transition hover:bg-white/5"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => connect({ connector: injected() })}
                  className="rounded-full border border-white/[0.15] bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Connect Wallet
                </button>
                )
              ) : (
                <div className="h-10 w-[132px] rounded-full border border-white/10 bg-white/5" />
              )}
              <Link
                href="/dashboard"
                className="rounded-full bg-[#8bd4ff] px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-[#a8dfff]"
              >
                Open App
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 pb-40 pt-8 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-12">
          <div className={`${isMounted ? "animate-fadeInUp" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8bd4ff]" />
              delivery infrastructure on chain
            </span>
            <h1
              style={{ animationDelay: "180ms" }}
              className={`mt-6 max-w-3xl text-5xl font-bold tracking-tight text-white md:text-7xl ${isMounted ? "animate-fadeInUp" : "opacity-0"}`}
            >
              Track every handoff. Prove every drop.
            </h1>
            <p
              style={{ animationDelay: "280ms" }}
              className={`mt-6 max-w-2xl text-lg leading-8 text-white/[0.78] md:text-xl ${isMounted ? "animate-fadeInUp" : "opacity-0"}`}
            >
              ProofDrop gives senders, delivery agents, and receivers a shared
              source of truth backed by smart contracts, wallet signatures, and
              verifiable location updates.
            </p>

            <div
              style={{ animationDelay: "360ms" }}
              className={`mt-8 flex flex-col gap-3 sm:flex-row ${isMounted ? "animate-fadeInUp" : "opacity-0"}`}
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f6c17b] px-6 py-3 text-sm font-semibold text-[#111827] shadow-[0_18px_50px_rgba(246,193,123,0.28)] transition hover:bg-[#ffd48b]"
              >
                Launch Command Center
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:border-white/45"
              >
                Verify a Delivery
              </Link>
            </div>

            <div
              style={{ animationDelay: "440ms" }}
              className={`mt-10 grid max-w-2xl gap-4 sm:grid-cols-3 ${isMounted ? "animate-fadeInUp" : "opacity-0"}`}
            >
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl"
                >
                  <div className="text-2xl font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-sm text-white/[0.55]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{ animationDelay: "520ms" }}
            className={`${isMounted ? "animate-fadeInUp" : "opacity-0"} relative`}
          >
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[#8bd4ff]/20 blur-3xl" />
            <div className="absolute -right-4 bottom-10 h-40 w-40 rounded-full bg-[#ff9f7a]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/[0.45]">
                    Proof Console
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    Immutable delivery timeline
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-emerald-300">
                  Live
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {signalCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                          <Icon className="h-5 w-5 text-[#8bd4ff]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{card.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-white/60">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/50">Current package</p>
                  <p className="mt-2 font-mono text-lg text-[#f6c17b]">PKG-2048</p>
                  <p className="mt-3 text-sm text-white/60">
                    Agent broadcasted: <span className="text-white">Out for Delivery</span>
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/50">Receiver state</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Awaiting wallet signature
                  </p>
                  <p className="mt-3 text-sm text-white/60">
                    Final release is cryptographically gated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-4 w-full max-w-6xl px-6 pb-24 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs uppercase tracking-[0.28em] text-white/[0.45]">
            {["Hardhat", "Polygon Amoy", "Wagmi", "Viem", "Leaflet", "MetaMask"].map((brand) => (
              <div key={brand}>{brand}</div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-[148px] left-1/2 z-0 h-36 w-28 -translate-x-1/2 rounded-md bg-gradient-to-b from-white/75 via-rose-100/60 to-transparent"
          style={{ animation: "subtlePulse 6s ease-in-out infinite" }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[54vh]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex h-full items-end gap-px px-[2px]">
            {pillars.map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-black transition-[height] duration-1000 ease-in-out"
                style={{
                  height: isMounted ? `${height}%` : "0%",
                  transitionDelay: `${Math.abs(index - Math.floor(pillars.length / 2)) * 60}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <AppleStyleDock />
      </section>
    </>
  );
}
