"use client"

import { motion } from "framer-motion"
import { useForensicSession } from "@/components/system/ForensicSession"
import { normalizeFromCLI } from "@/lib/normalizeFromCLI"

export default function SignalBreakdown() {
  const { result } = useForensicSession()
  if (!result) return null

  const signals = normalizeFromCLI(result)

  return (
    <div className="border border-neutral-800 rounded-xl p-6 bg-black">
      <h3 className="text-xs tracking-widest text-indigo-400 mb-6">
        EVIDENCE SIGNALS
      </h3>

      <div className="space-y-4">
        {signals.map((s, i) => (
          <motion.details
            key={s.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="border-b border-neutral-800 pb-3"
          >
            <summary className="flex justify-between cursor-pointer text-sm">
              <span className="text-gray-300">{s.label}</span>
              <span className="text-xs text-gray-400">{s.status}</span>
            </summary>

            {s.meta && (
              <div className="mt-2 text-xs text-gray-500">
                {s.meta}
              </div>
            )}

            {typeof s.value === "number" && (
              <div className="mt-2 h-2 bg-neutral-800 rounded">
                <div
                  className="h-full bg-indigo-500 rounded"
                  style={{ width: `${s.value}%` }}
                />
              </div>
            )}
          </motion.details>
        ))}
      </div>
    </div>
  )
}
