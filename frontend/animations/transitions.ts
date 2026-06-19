import type { Variants } from "framer-motion";

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 0.84, 0.44, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } },
};

export const navBlur = {
  initial: { backdropFilter: "blur(0px)", backgroundColor: "rgba(5,8,22,0)" },
  scrolled: { backdropFilter: "blur(18px)", backgroundColor: "rgba(5,8,22,0.72)" },
};
