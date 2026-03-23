import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Compass,
  MapPinned,
  ShieldCheck,
  Signature,
  Truck,
} from "lucide-react";
import { Web3HeroAnimated } from "@/components/ui/animated-web3-landing-page";
import { ProofDropFooter } from "@/components/ui/proofdrop-footer";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const workflow = [
  {
    title: "Sender initializes the package",
    description:
      "A sender creates a package ID and binds the delivery to agent and receiver wallet addresses in the contract.",
    icon: Compass,
  },
  {
    title: "Agent publishes the route status",
    description:
      "Delivery agents update the contract with the current milestone and optional GPS coordinates for public visibility.",
    icon: Truck,
  },
  {
    title: "Receiver signs the final handoff",
    description:
      "The proof only closes when the receiver wallet confirms completion, giving everyone a shared immutable outcome.",
    icon: Signature,
  },
];

const signalCards = [
  {
    title: "Smart contract first",
    description:
      "Core lifecycle events live in Solidity, so verification does not depend on a mutable admin dashboard.",
    icon: Blocks,
  },
  {
    title: "Map-aware status updates",
    description:
      "GPS-linked updates pair well with the public verification page to show where the drop actually happened.",
    icon: MapPinned,
  },
  {
    title: "No fake delivery screenshots",
    description:
      "Wallet-level receiver confirmation removes the weak final step that usually causes costly support disputes.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    author: {
      name: "Emma Thompson",
      handle: "@emma_ops",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "ProofDrop gave our operations team a shared proof layer. When a receiver disputes a drop, we check the on-chain record instead of chasing screenshots.",
    href: "https://twitter.com/emmaai",
  },
  {
    author: {
      name: "David Park",
      handle: "@david_chain",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The sender-agent-receiver separation is the part that clicked for us. Each stakeholder has a clear role and the final signature closes the loop cleanly.",
    href: "https://twitter.com/davidtech",
  },
  {
    author: {
      name: "Sofia Rodriguez",
      handle: "@sofia_maps",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "The public verify page makes live delivery proof understandable for non-technical users. That helped us onboard support and field agents much faster.",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#050816] text-white">
      <Web3HeroAnimated />

      <section className="relative border-y border-white/10 bg-[#070b14]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              label: "Public verify route",
              value: "/verify",
              note: "Anyone can inspect a package timeline without wallet access.",
            },
            {
              label: "Operator route",
              value: "/dashboard",
              note: "One place for senders, agents, and receivers to complete actions.",
            },
            {
              label: "Contract action flow",
              value: "Create -> Update -> Confirm",
              note: "The UI mirrors the smart contract lifecycle already present in the repo.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
              Workflow
            </span>
            <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Designed around the exact delivery lifecycle your contract already enforces.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
              The landing page now speaks directly to the way ProofDrop works:
              initialize a package, update agent location and status, then collect
              the receiver signature that seals the proof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Open dashboard
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-full border border-[#8bd4ff]/30 bg-[#8bd4ff]/10 px-5 py-3 text-sm font-medium text-[#8bd4ff] transition hover:bg-[#8bd4ff]/[0.15]"
              >
                Open verification portal
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8bd4ff]/[0.12] text-[#8bd4ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="mb-2 text-sm uppercase tracking-[0.24em] text-slate-500">
                        Step {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="signals"
        className="relative border-y border-white/10 bg-[linear-gradient(180deg,rgba(139,212,255,0.07),rgba(5,8,22,0.2))]"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">
              Signals
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              The interface now mirrors the strongest parts of the product.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">
              Instead of a minimal hero, the home page now frames ProofDrop as a
              proof layer for logistics with visible chain state, location-aware
              updates, and signature-based completion.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {signalCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="rounded-[30px] border border-white/10 bg-slate-950/[0.55] p-7 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.08]">
                    <Icon className="h-5 w-5 text-[#f6c17b]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials">
        <TestimonialsSection
          title="Teams adopt faster when every handoff is legible"
          description="Operators, field teams, and receivers all understand the same proof trail when the product experience matches the delivery workflow."
          testimonials={testimonials}
        />
      </section>

      <ProofDropFooter />
    </div>
  );
}
