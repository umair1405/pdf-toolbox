"use client";

export function GradientMesh() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[520px] h-[520px] rounded-full bg-primary blur-[90px] opacity-35 -top-40 -left-32 animate-[drift1_22s_ease-in-out_infinite]" />
      <div className="absolute w-[460px] h-[460px] rounded-full bg-accent blur-[90px] opacity-35 top-72 -right-40 animate-[drift2_26s_ease-in-out_infinite]" />
      <div className="absolute w-[380px] h-[380px] rounded-full bg-secondary blur-[90px] opacity-25 -bottom-32 left-1/3 animate-[drift3_24s_ease-in-out_infinite]" />

      <style jsx>{`
        @keyframes drift1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,40px) scale(1.1); } }
        @keyframes drift2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,30px) scale(0.92); } }
        @keyframes drift3 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,-30px) scale(1.05); } }
      `}</style>
    </div>
  );
}
