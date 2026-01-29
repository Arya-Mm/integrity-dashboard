"use client"

import { motion } from "framer-motion"

const LOGS = [
  "[TIER-0] Capture likelihood: 0.70",
  "[TIER-0] Survivability: HIGH",
  "[rPPG] Heart rhythm detected",
  "[Depth] MiDaS geometric consistency",
  "[Identity] Stable across frames",
  ">>> Verdict: REAL_PROCESSED",
  ">>> P(real): 0.336"
]

export default function SignalDashboard() {
  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-10">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold mb-10"
      >
        Evidence Console
      </motion.h2>

      <div className="w-full max-w-6xl space-y-10">

        {/* SUMMARY */}
        <div className="flex justify-between border border-indigo-500/40 rounded-xl p-6 bg-[#0b0b0b]">
          <div>
            <p className="text-xs tracking-widest text-gray-400">
              VERDICT
            </p>
            <p className="text-xl text-green-400 mt-1">
              REAL_PROCESSED
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest text-gray-400">
              CONFIDENCE
            </p>
            <p className="text-xl text-indigo-400 mt-1">
              33.6%
            </p>
          </div>

          <div>
            <p className="text-xs tracking-widest text-gray-400">
              SIGNAL QUALITY
            </p>
            <p className="text-xl text-white mt-1">
              0.85
            </p>
          </div>
        </div>

        {/* LOG STREAM */}
        <div className="border border-gray-800 rounded-xl bg-[#050505] p-6 font-mono text-xs space-y-2">
          <div className="text-indigo-400 tracking-widest mb-2">
            FORENSIC TRACE
          </div>

          {LOGS.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                line.includes("Verdict")
                  ? "text-green-400"
                  : "text-gray-400"
              }
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
