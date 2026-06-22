import type { Variants } from "framer-motion";

// All animations disabled - static UI only
export const fadeUp: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0 },
};

export const float: Variants = {
  animate: { opacity: 1 },
};

export const cardTiltMax = 10; // degrees, used by the 3D tilt hook
