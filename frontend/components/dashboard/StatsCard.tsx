"use client";



interface StatsCardProps {
  target: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

export function StatsCard({ target, decimals = 0, suffix = "", label }: StatsCardProps) {
  const display = target.toLocaleString(undefined, { maximumFractionDigits: decimals });

  return (
    <div className="glass rounded-2xl p-5.5">
      <div className="font-display text-[30px] font-bold">
        {display}
        {suffix}
      </div>
      <div className="text-[13px] text-gray-600 mt-1.5">{label}</div>
    </div>
  );
}
