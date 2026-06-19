"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressBarProps {
  percent: number;
  statusText: string;
  done?: boolean;
}

export function ProgressBar({ percent, statusText, done }: ProgressBarProps) {
  return (
    <div>
      <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden mt-6.5">
        <motion.div
          className="h-full bg-grad-warm rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ ease: "linear", duration: 0.25 }}
        />
      </div>
      <div className="flex items-center gap-2.5 mt-3.5 text-[13.5px] text-white/64 min-h-[20px]">
        <span>{statusText}</span>
        <AnimatePresence>
          {done && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Check size={18} className="text-[#3DDC97]" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
