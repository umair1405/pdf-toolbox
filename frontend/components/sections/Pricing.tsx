"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { plans } from "@/config/pricing";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function Pricing() {
  return null;
}
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-[560px] mx-auto mb-14 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            Pricing
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            Pay for speed, not for the basics.
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5.5"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={cn(
                "glass rounded-2xl p-8.5 relative",
                plan.featured && "border-accent shadow-[0_0_0_1px_#6C63FF,0_30px_60px_-25px_rgba(108,99,255,0.45)]"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-7 bg-grad-cool font-mono text-[11px] font-semibold px-3 py-1.5 rounded-full">
                  Most used
                </span>
              )}
              <div className="font-display font-semibold text-lg">{plan.name}</div>
              <div className="font-display font-bold text-[42px] mt-3.5">
                {plan.amount}
                <span className="text-sm text-white/38 font-body font-normal">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-2.5 mt-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-[13.5px] text-white/64 flex gap-2.5">
                    <span className="text-white/38">—</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="#upload" variant={plan.featured ? "primary" : "ghost"} className="w-full mt-7">
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
