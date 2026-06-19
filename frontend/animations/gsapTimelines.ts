import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function revealOnScroll(selector: string, opts?: { stagger?: number }) {
  return gsap.from(selector, {
    opacity: 0,
    y: 24,
    duration: 0.7,
    ease: "power3.out",
    stagger: opts?.stagger ?? 0.08,
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
}

export function countUp(el: Element, target: number, opts?: { decimals?: number; suffix?: string }) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: 1.6,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = obj.val.toFixed(opts?.decimals ?? 0) + (opts?.suffix ?? "");
    },
  });
}
