"use client";

import { useCursorTrail } from "@/hooks/useCursorTrail";

export function CustomCursor() {
  const { dotRef, ringRef } = useCursorTrail();

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-white pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-white/70 pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height,border-color] duration-200 hidden md:block [&.hovering]:w-16 [&.hovering]:h-16 [&.hovering]:border-accent"
      />
    </>
  );
}
