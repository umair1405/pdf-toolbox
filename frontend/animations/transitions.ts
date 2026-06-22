import type { Variants } from "framer-motion";

// All transitions disabled - static UI only
export const pageTransition: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};

export const navBlur = {
  initial: { backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0.95)" },
  scrolled: { backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0.95)" },
};
