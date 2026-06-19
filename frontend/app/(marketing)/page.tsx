"use client";

import { useLenis } from "@/hooks/useLenis";
import { GradientMesh } from "@/components/background/GradientMesh";
import { ParticleField } from "@/components/background/ParticleField";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Tools } from "@/components/sections/Tools";
import { UploadSection } from "@/components/sections/UploadSection";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/Button";

export default function MarketingPage() {
  useLenis();

  return (
    <>
      <GradientMesh />
      <ParticleField />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Tools />
        <UploadSection />
        <DashboardPreview />
        <Pricing />
        <FAQ />
        <section className="text-center py-20 relative z-10">
          <div className="max-w-[1180px] mx-auto px-7">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
              Ready when you are
            </span>
            <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
              Convert your first file, free.
            </h2>
            <Button href="#upload" className="mt-7">Start free</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
