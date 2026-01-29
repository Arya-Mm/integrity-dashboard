"use client"

import type { ForensicResult } from "@/lib/types"

interface Props {
  result: ForensicResult
  onDownloadReport: () => void
}

export default function VerdictPanel({
  result,
  onDownloadReport,
}: Props) {
  const isReal = result.verdict === "REAL"

  const color = isReal ? "text-green-400" : "text-red-500"
  const glow = isReal
    ? "shadow-[0_0_30px_rgba(34,197,94,0.35)]"
    : "shadow-[0_0_30px_rgba(239,68,68,0.45)]"

  return (
    <section className="border border-neutral-800 rounded-xl bg-[#050505] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-widest">
          VERDICT —
          <span className={`ml-2 ${color}`}>
            {result.verdict}
          </span>
        </h2>

        <span className="text-xs tracking-widest text-gray-500">
          FINAL DECISION
        </span>
      </div>

      <div className={`text-4xl font-bold ${color} ${glow}`}>
        {(result.p_real * 100).toFixed(1)}%
      </div>

      <p className="text-sm text-gray-400">
        Authenticity Probability (P(real))
      </p>

      <div className="pt-4">
        <button
          onClick={onDownloadReport}
          className="
            px-6 py-3
            border border-gray-600 rounded-lg
            text-sm tracking-wide
            hover:border-white hover:text-white
            transition
          "
        >
          Download Forensic Report (PDF)
        </button>
      </div>
    </section>
  )
}
