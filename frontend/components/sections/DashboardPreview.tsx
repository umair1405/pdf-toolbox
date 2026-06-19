"use client";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { ConversionChart } from "@/components/dashboard/ConversionChart";

const breakdown = [
  ["Word", 62, "#6C63FF"],
  ["Image", 21, "#FF4D4D"],
  ["Excel", 11, "#22C55E"],
  ["Other", 6, "#94A3B8"],
] as const;

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-[120px] relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-[560px] mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            Your dashboard
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            Everything you've converted, in one place.
          </h2>
        </div>

        <div className="glass rounded-2xl p-10">
          <div className="grid sm:grid-cols-3 gap-5 mb-9">
            <StatsCard target={14820} label="Files converted this month" />
            <StatsCard target={4.2} decimals={1} suffix="s" label="Average conversion time" />
            <StatsCard target={99.95} decimals={2} suffix="%" label="Uptime, trailing 90 days" />
          </div>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
            <div className="glass rounded-2xl p-7">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64">This week</span>
              <ConversionChart />
            </div>
            <div className="glass rounded-2xl p-7">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64">Format breakdown</span>
              <div className="flex flex-col gap-4 mt-5.5">
                {breakdown.map(([name, pct, color]) => (
                  <div key={name}>
                    <div className="flex justify-between text-[13.5px] mb-1.5">
                      <span>{name}</span>
                      <span className="text-white/38">{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
