"use client";

import { useEffect, useRef } from "react";

export function useCursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let frame: number;

    function handleMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    }

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      frame = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMove);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  function bindHoverTarget(el: HTMLElement | null) {
    if (!el) return;
    el.addEventListener("mouseenter", () => ringRef.current?.classList.add("hovering"));
    el.addEventListener("mouseleave", () => ringRef.current?.classList.remove("hovering"));
  }

  return { dotRef, ringRef, bindHoverTarget };
}
