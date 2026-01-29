"use client"

import type { ForensicResult } from "@/lib/types"

interface Props {
  result: ForensicResult
}

export default function ConfidenceHUD({ result }: Props) {
  const p = result.p_real
  const percent = Math.round(p * 100)

  const color =
    p < 0.3 ? "text-red-400" :
    p < 0.6 ? "text-yellow-400" :
    "text-green-400"

  return (
    <div className="border border-neutral-800 rounded-xl bg-black p-6">
      <h2 className="text-xs tracking-widest text-gray-400 mb-4">
        CONFIDENCE HUD
      </h2>

      <div className="relative h-24 flex items-center justify-center">
        {/* Meter */}
        <div className="w-full h-2 bg-neutral-800 rounded relative">
          <div
            className="absolute top-0 h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded"
            style={{ width: "100%" }}
          />
        </div>

        {/* Needle */}
        <div
          className="absolute -bottom-2 transition-all duration-700 ease-out"
          style={{ left: `${percent}%` }}
        >
          <div className="w-1 h-10 bg-white" />
        </div>
      </div>

      <div className={`mt-4 text-center font-mono text-lg ${color}`}>
        P(real): {p.toFixed(3)}
      </div>
    </div>
  )
}
