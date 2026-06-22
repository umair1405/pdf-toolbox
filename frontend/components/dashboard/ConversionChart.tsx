"use client";

const days = [
  ["Mon", 42], ["Tue", 68], ["Wed", 55], ["Thu", 91],
  ["Fri", 76], ["Sat", 30], ["Sun", 22],
] as const;

export function ConversionChart() {
  return (
    <div className="flex items-end gap-3.5 h-[160px] mt-6">
      {days.map(([label, value]) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div
            className="w-full max-w-[30px] rounded-t-md rounded-b-sm bg-blue-500"
            style={{ height: `${value}%` }}
          />
          <span className="font-mono text-[11px] text-gray-500">{label}</span>
        </div>
      ))}
    </div>
  );
}
