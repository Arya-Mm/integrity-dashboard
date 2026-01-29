"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ForensicResult } from "@/lib/types"
import type { ReactNode } from "react"

interface VerdictSlamProps {
  result: ForensicResult
  show: boolean
  children: ReactNode
}

export default function VerdictSlam({
  result,
  show,
  children,
}: VerdictSlamProps) {
  const isReal = result.p_real >= 0.5

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="verdict-slam"
          initial={{ y: 60, scale: 0.92, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 16,
          }}
          className="relative"
        >
          {/* Impact pulse */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: isReal
                ? "0 0 60px rgba(16,185,129,0.35)"
                : "0 0 60px rgba(239,68,68,0.35)",
            }}
          />

          {/* Verdict content */}
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
