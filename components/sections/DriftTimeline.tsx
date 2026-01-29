"use client"

import { motion } from "framer-motion"

const POINTS = [
  0.98, 0.97, 0.96, 0.965, 0.955, 0.95, 0.945
]

const THRESHOLD = 0.7

export default function DriftTimeline() {
  const path = POINTS.map((v, i) => {
    const x = (i / (POINTS.length - 1)) * 100
    const y = 100 - v * 100
    return `${i === 0 ? "M" : "L"} ${x},${y}`
  }).join(" ")

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-10">
      <h2 className="text-4xl font-bold mb-10">
        Identity Stability Timeline
      </h2>

      <div className="w-full max-w-5xl border border-gray-800 rounded-xl bg-[#050505] p-8">

        <svg viewBox="0 0 100 100" className="w-full h-64">
          <line
            x1="0"
            y1={100 - THRESHOLD * 100}
            x2="100"
            y2={100 - THRESHOLD * 100}
            stroke="rgba(255,255,0,0.4)"
            strokeDasharray="4 4"
          />

          <motion.path
            d={path}
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
          />
        </svg>
      </div>
    </section>
  )
}
