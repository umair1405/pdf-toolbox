"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  ["What file formats can I convert?", "PDF to Word, PowerPoint, Excel, PNG, JPG, and plain text, plus merge, split, compress, and OCR — all in the reverse direction too for most formats."],
  ["Is there a file size limit?", "Free accounts are capped at 10MB per file. Pro and Team accounts go up to 200MB, with larger limits available on request."],
  ["When are my files deleted?", "Originals and converted files are removed from storage automatically within an hour of the job completing, on every plan."],
  ["Does OCR work on scanned documents?", "Yes — the OCR engine supports over 40 languages and works on scanned pages, photographed documents, and mixed text/image PDFs."],
  ["Can I cancel anytime?", "Yes, from the billing page in your dashboard. You keep access until the end of the current billing period."],
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-[120px] relative z-10">
      <div className="max-w-[760px] mx-auto px-7">
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            FAQ
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            Good to know.
          </h2>
        </div>

        <div>
          {faqs.map(([q, a], i) => {
            const open = openIndex === i;
            return (
              <div key={q} className="border-b border-white/[0.09]">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex justify-between items-center py-6 font-display font-semibold text-base text-left"
                >
                  {q}
                  <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.35 }}>
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 0.84, 0.44, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14.5px] text-white/64 leading-relaxed pb-6 max-w-[640px]">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
