"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const columns = [
  { title: "Product", links: ["Features", "Tools", "Pricing"] },
  { title: "Company", links: ["About", "Blog", "Careers"] },
  { title: "Resources", links: ["Docs", "API", "Support"] },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
      className="py-20 pb-9 border-t border-white/[0.09] relative z-10"
    >
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-2.5 font-display font-semibold text-lg mb-3.5">
              <span
                className="w-6 h-6 rounded-[5px] bg-grad-warm"
                style={{ clipPath: "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 0 100%)" }}
              />
              {siteConfig.name}
            </div>
            <p className="text-[13.5px] text-white/38 max-w-[240px] leading-relaxed">
              Convert PDFs into anything, without leaving a tab open.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-xs uppercase tracking-[0.08em] text-white/38 mb-4.5">{col.title}</h5>
              {col.links.map((l) => (
                <a key={l} href="#" className="block text-sm text-white/64 mb-3 hover:text-white transition-colors">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2.5 mt-15 pt-6 border-t border-white/[0.09] text-[12.5px] text-white/38">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <span>Built with Next.js · FastAPI · Celery</span>
        </div>
      </div>
    </motion.footer>
  );
}
