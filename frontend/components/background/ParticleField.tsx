"use client";

import { useEffect, useRef } from "react";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = document.body.scrollHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: reduced ? 0 : 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * canvas!.height,
      r: Math.random() * 1.6 + 0.4,
      s: Math.random() * 0.4 + 0.1,
      drift: Math.random() * 0.4 - 0.2,
    }));

    let frame: number;
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.fillStyle = "rgba(255,255,255,0.5)";
      particles.forEach((p) => {
        p.y -= p.s;
        p.x += p.drift;
        if (p.y < -10) {
          p.y = canvas!.height + 10;
          p.x = Math.random() * window.innerWidth;
        }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
}
