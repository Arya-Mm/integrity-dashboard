"use client"

import { useState } from "react"
import { normalizeFromCLI } from "@/lib/normalizeFromCLI"
import { useForensicSession } from "@/components/system/ForensicSession"

export default function EvidencePanel() {
  const { result } = useForensicSession()
  const [open, setOpen] = useState<string | null>(null)

  if (!result) return null
  const signals = normalizeFromCLI(result)

  return (
    <div className="border border-neutral-800 rounded-xl bg-black p-6">
      <h2 className="text-xs tracking-widest text-red-400 mb-4">
        EVIDENCE & REASONING
      </h2>

      <div className="space-y-3">
        {signals.map(s => (
          <div
            key={s.key}
            className="border border-neutral-800 rounded"
          >
            <button
              onClick={() => setOpen(open === s.key ? null : s.key)}
              className="w-full flex justify-between px-4 py-2 text-sm"
            >
              <span>{s.label}</span>
              <span className="text-gray-400">{s.status}</span>
            </button>

            {open === s.key && (
              <div className="px-4 py-3 text-xs text-gray-400 bg-neutral-900">
                {s.meta ?? "No anomaly detected. Signal within expected bounds."}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
