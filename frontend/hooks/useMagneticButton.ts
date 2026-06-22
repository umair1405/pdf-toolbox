"use client";

import { useRef } from "react";

export function useMagneticButton<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  return ref;
}
