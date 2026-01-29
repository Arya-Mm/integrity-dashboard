"use client"

export default function ConfidenceRing({ value }: { value: number }) {
  const pct = Math.round(value * 100)

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="160" height="160" className="rotate--90deg">
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="#111"
          strokeWidth="12"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="70"
          stroke="#6366f1"
          strokeWidth="12"
          fill="none"
          strokeDasharray={`${pct * 4.4} 999`}
        />
      </svg>

      <div className="absolute text-center">
        <p className="text-2xl font-bold">{pct}%</p>
        <p className="text-xs text-neutral-400 tracking-widest">
          P(REAL)
        </p>
      </div>
    </div>
  )
}
