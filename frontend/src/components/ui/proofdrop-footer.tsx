"use client";

import Link from "next/link";
import {
  Blocks,
  Compass,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";

export function ProofDropFooter() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Open Dashboard", href: "/dashboard" },
        { label: "Verify Delivery", href: "/verify" },
        { label: "On-chain Workflow", href: "#workflow" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Role-based actions", href: "#signals" },
        { label: "GPS status proofs", href: "#signals" },
        { label: "Receiver sign-off", href: "#testimonials" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#8bd4ff]" />,
      text: "ops@proofdrop.app",
      href: "mailto:ops@proofdrop.app",
    },
    {
      icon: <Phone size={18} className="text-[#8bd4ff]" />,
      text: "+91 80 5555 2107",
      href: "tel:+918055552107",
    },
    {
      icon: <MapPin size={18} className="text-[#8bd4ff]" />,
      text: "Polygon Amoy + Local Hardhat",
    },
  ];

  const capabilityLinks = [
    { icon: <Compass size={20} />, label: "Workflow" },
    { icon: <ShieldCheck size={20} />, label: "Verify" },
    { icon: <Wallet size={20} />, label: "Wallet" },
    { icon: <Blocks size={20} />, label: "Chain" },
  ];

  return (
    <footer
      id="footer"
      className="relative m-4 overflow-hidden rounded-[32px] border border-white/10 bg-[#0f111a]/60 sm:m-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl p-8 sm:p-12 lg:p-14">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-10">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8bd4ff] to-[#f6c17b] text-black">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">ProofDrop</p>
                <p className="text-sm text-slate-400">
                  Delivery certainty without central trust.
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Built for logistics teams that want every handoff, location
              update, and final signature backed by smart contracts instead of
              screenshots and dispute threads.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 text-lg font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[#8bd4ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-[#8bd4ff]">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-sm text-slate-400 md:flex-row">
          <div className="flex flex-wrap items-center gap-5">
            {capabilityLinks.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
              >
                {icon}
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p>© {new Date().getFullYear()} ProofDrop. All rights reserved.</p>
        </div>
      </div>

      <div className="hidden h-[26rem] -translate-y-6 lg:flex">
        <TextHoverEffect text="ProofDrop" className="z-10" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
