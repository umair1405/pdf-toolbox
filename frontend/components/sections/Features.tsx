"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, LayoutGrid, ListChecks } from "lucide-react";
import { fadeUp, staggerContainer } from "@/animations/variants";

const features = [
  { icon: Zap, title: "Instant queueing", desc: "Background workers pick up your file the moment it lands — most conversions finish before you'd finish reading this sentence." },
  { icon: ShieldCheck, title: "Private by default", desc: "Files are encrypted in transit and at rest, then permanently deleted from storage within an hour of conversion." },
  { icon: LayoutGrid, title: "Formatting kept intact", desc: "Tables, fonts, and layout survive the round trip — conversions use the same rendering engines real office suites use." },
  { icon: ListChecks, title: "Batch processing", desc: "Drop a folder, not a file. Convert dozens of documents at once and download them as a single archive." },
];

function FeatureCard({ icon: Icon, title, desc }: (typeof features)[number]) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
  }
  function handleMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.12s linear" }}
      className="glass rounded-2xl p-7.5 hover:border-white/20"
    >
      <div className="w-10.5 h-10.5 rounded-xl bg-grad-cool flex items-center justify-center mb-5" style={{ transform: "translateZ(30px)" }}>
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="font-display font-semibold text-[17px]" style={{ transform: "translateZ(20px)" }}>{title}</h3>
      <p className="text-sm text-white/64 leading-relaxed mt-2.5" style={{ transform: "translateZ(20px)" }}>{desc}</p>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="py-[120px] relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-[560px] mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            Why it feels different
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            Built like a tool, not a website.
          </h2>
          <p className="text-base text-white/64 leading-relaxed mt-3.5">
            Every part of the pipeline is optimized for the one thing you came here to do.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
