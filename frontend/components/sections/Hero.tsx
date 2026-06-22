"use client";

export function Hero() {
  return null;
}
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const word = words[wordIndex % words.length];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 1300);
          return;
        }
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          setWordIndex((i) => i + 1);
          timeout = setTimeout(tick, 250);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 45 : 85);
    }

    timeout = setTimeout(tick, 85);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex]);

  return { text, currentWord: words[wordIndex % words.length] };
}

export function Hero() {
  const { text, currentWord } = useTypewriter(siteConfig.typewriterWords);

  return (
    <section className="pt-[200px] pb-[100px] min-h-[92vh] flex items-center relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-[1180px] mx-auto px-7 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center"
      >
        <div>
          <motion.span variants={fadeUp} className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            PDF → Anything
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-[clamp(40px,6vw,68px)] leading-[1.04] tracking-[-0.02em] mt-5"
          >
            Convert PDFs into
            <br />
            <span className="bg-grad-warm bg-clip-text text-transparent">{text}</span>
            <span className="type-cursor h-[0.9em] relative top-2" />
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[17px] leading-relaxed text-white/64 max-w-[480px] mt-6">
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-4 mt-9 flex-wrap">
            <Button href="#upload">Start free</Button>
            <Button href="#upload" variant="ghost">
              <span className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white -ml-0.5" />
              Watch demo
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-7 mt-12">
            {[
              ["2.1M+", "files converted"],
              ["4.2s", "avg. conversion time"],
              ["99.95%", "uptime"],
            ].map(([num, label]) => (
              <div key={label} className="font-mono text-[13px] text-white/38">
                <b className="block font-display text-xl text-white font-semibold not-italic">{num}</b>
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative h-[440px] order-first lg:order-last">
          <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%] rounded-full bg-[radial-gradient(circle,rgba(255,77,77,0.18),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 m-auto w-[300px] h-[380px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-3xl bg-surface border border-white/[0.09] rotate-[-7deg] scale-95 opacity-50 top-4.5" />
            <div className="absolute inset-0 rounded-3xl bg-surface border border-white/[0.09] rotate-[5deg] scale-[0.97] opacity-70 top-2" />
            <motion.div
              animate={float.animate}
              className="absolute inset-0 rounded-3xl border border-white/[0.09] flex flex-col items-center justify-center gap-4.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
              style={{ background: "linear-gradient(160deg,#0E1320,#0a0e1c)" }}
            >
              <motion.span
                key={currentWord}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="font-mono font-semibold text-2xl text-white px-7.5 py-5 rounded-2xl min-w-[150px] text-center shadow-[0_18px_40px_-10px_rgba(255,77,77,0.5)]"
                style={{ background: FORMAT_GRADIENTS[currentWord] }}
              >
                {currentWord.toUpperCase().slice(0, 4)}
              </motion.span>
              <span className="font-mono text-xs text-white/38 uppercase tracking-[0.1em]">
                Converting to {currentWord}
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-1 h-4.5 rounded-sm",
                      i < 7 ? "bg-grad-warm" : "bg-white/[0.15]"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
