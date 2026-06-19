"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { tools } from "@/config/tools";

export function Tools() {
  return (
    <section id="tools" className="py-[120px] relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-[560px] mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            Every format you'll ever need
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            One toolbox, eight tools.
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 flex items-center gap-3.5 hover:border-white/[0.18] hover:bg-white/[0.07] transition-colors"
            >
              <span className={`font-mono font-semibold text-[11.5px] text-white px-2.5 py-2 rounded-[9px] flex-shrink-0 min-w-[46px] text-center bg-gradient-to-br ${tool.gradient}`}>
                {tool.badge}
              </span>
              <div>
                <h4 className="text-[14.5px] font-semibold">{tool.name}</h4>
                <span className="text-xs text-white/38 block mt-0.5">{tool.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
