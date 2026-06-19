"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface StatsCardProps {
  target: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export function StatsCard({ target, decimals = 0, suffix = "", label }: StatsCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 0.84, 0.44, 1],
      onUpdate: (v) => setDisplay(v.toLocaleString(undefined, { maximumFractionDigits: decimals })),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="glass rounded-2xl p-5.5">
      <div className="font-display text-[30px] font-bold">
        {display}
        {suffix}
      </div>
      <div className="text-[13px] text-white/64 mt-1.5">{label}</div>
    </div>
  );
}
