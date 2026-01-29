"use client"

import { motion } from "framer-motion"

type Props = {
  active: boolean
}

export default function ProcessingScanner({ active }: Props) {
  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="border border-indigo-500/30 rounded-xl p-6 bg-black"
    >
      <motion.div
        className="text-xs tracking-widest text-indigo-400 text-center"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        ANALYZING · MULTI-SIGNAL FORENSICS
      </motion.div>

      <motion.div
        className="mt-4 h-[2px] bg-indigo-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
