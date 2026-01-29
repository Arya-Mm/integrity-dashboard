"use client";

import { motion, AnimatePresence } from "framer-motion";
import {  useMemo } from "react";

interface JudgeProbabilityHUDProps {
  /** probability that content is REAL: 0 → 1 */
  pReal: number;
  /** show needle only when verdict is ready */
  show: boolean;
}

export default function JudgeProbabilityHUD({
  pReal,
  show,
}: JudgeProbabilityHUDProps) {
  // clamp defensively (backend-safe)
  const clamped = useMemo(
    () => Math.min(1, Math.max(0, pReal)),
    [pReal]
  );

  // Map probability to rotation (-90deg → +90deg)
  const rotation = useMemo(() => {
    return -90 + clamped * 180;
  }, [clamped]);

  return (
    <div className="relative mt-8 rounded-xl border border-neutral-800 bg-black/50 p-6">
      <h3 className="mb-4 text-xs uppercase tracking-widest text-neutral-400">
        Judicial Confidence Meter
      </h3>

      {/* Meter Track */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-neutral-900">
        {/* Danger Zones */}
        <div className="absolute inset-0 flex">
          <div className="w-1/3 bg-red-600/40" />
          <div className="w-1/3 bg-amber-500/40" />
          <div className="w-1/3 bg-emerald-600/40" />
        </div>
      </div>

      {/* Needle */}
      <div className="relative mt-6 h-10">
        <AnimatePresence>
          {show && (
            <motion.div
              key="needle"
              className="absolute left-1/2 top-0 h-10 w-[2px] origin-bottom bg-neutral-200"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{
                rotate: rotation,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Labels */}
      <div className="mt-2 flex justify-between text-[11px] tracking-wide text-neutral-500">
        <span>FAKE</span>
        <span>UNCERTAIN</span>
        <span>REAL</span>
      </div>

      {/* Pulse on reveal */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              boxShadow: "0 0 40px rgba(255,255,255,0.15)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
