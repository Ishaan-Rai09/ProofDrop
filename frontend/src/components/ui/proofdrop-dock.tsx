"use client";

import { useRouter } from "next/navigation";
import {
  BellRing,
  Blocks,
  Compass,
  LayoutDashboard,
  Radar,
  ShieldCheck,
  Signature,
} from "lucide-react";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

const data = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Verify",
    icon: ShieldCheck,
    href: "/verify",
  },
  {
    title: "Workflow",
    icon: Compass,
    sectionId: "workflow",
  },
  {
    title: "Telemetry",
    icon: Radar,
    sectionId: "signals",
  },
  {
    title: "Testimonials",
    icon: BellRing,
    sectionId: "testimonials",
  },
  {
    title: "Receiver Sign-off",
    icon: Signature,
    sectionId: "footer",
  },
  {
    title: "Polygon Ready",
    icon: Blocks,
    sectionId: "signals",
  },
];

export function AppleStyleDock() {
  const router = useRouter();

  const handleAction = (href?: string, sectionId?: string) => {
    if (href) {
      router.push(href);
      return;
    }

    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="absolute bottom-3 left-1/2 hidden max-w-full -translate-x-1/2 xl:block">
      <Dock className="items-end pb-3">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <DockItem
              key={item.title}
              onClick={() => handleAction(item.href, item.sectionId)}
              className="aspect-square rounded-full border border-white/10 bg-white/[0.08] hover:bg-white/[0.14]"
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>
                <Icon className="h-full w-full text-slate-200" />
              </DockIcon>
            </DockItem>
          );
        })}
      </Dock>
    </div>
  );
}
