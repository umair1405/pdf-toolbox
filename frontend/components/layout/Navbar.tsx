"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-bg/72 backdrop-blur-xl border-b border-white/[0.09] py-3.5"
          : "border-b border-transparent py-5"
      )}
    >
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-display font-semibold text-lg">
          <span
            className="w-6.5 h-6.5 rounded-[5px] bg-grad-warm"
            style={{ clipPath: "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%)" }}
          />
          {siteConfig.name}
        </div>

        <ul className="hidden md:flex gap-9 text-[14.5px] text-white/64">
          {siteConfig.nav.map((item) => (
            <li key={item.href} className="relative group">
              <a href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </a>
              <span className="absolute left-0 -bottom-1.5 h-px w-0 bg-grad-warm transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Button href="#upload" size="sm" className="hidden sm:inline-flex">
            Start free
          </Button>
          <button
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="w-5.5 h-0.5 bg-white rounded" />
            <span className="w-5.5 h-0.5 bg-white rounded" />
            <span className="w-5.5 h-0.5 bg-white rounded" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-7 pb-6 pt-4 flex flex-col gap-4">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </a>
          ))}
          <Button href="#upload" size="sm">Start free</Button>
        </div>
      )}
    </nav>
  );
}
