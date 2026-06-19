"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const days = [
  ["Mon", 42], ["Tue", 68], ["Wed", 55], ["Thu", 91],
  ["Fri", 76], ["Sat", 30], ["Sun", 22],
] as const;

export function ConversionChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="flex items-end gap-3.5 h-[160px] mt-6">
      {days.map(([label, value], i) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <motion.div
            className="w-full max-w-[30px] rounded-t-md rounded-b-sm bg-grad-cool"
            initial={{ height: 0 }}
            animate={{ height: inView ? `${value}%` : 0 }}
            transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 0.84, 0.44, 1] }}
          />
          <span className="font-mono text-[11px] text-white/38">{label}</span>
        </div>
      ))}
    </div>
  );
}
