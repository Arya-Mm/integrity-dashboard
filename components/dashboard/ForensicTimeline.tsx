"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type TimelineSignal = {
  id: string;
  label: string;
};

const SIGNALS: TimelineSignal[] = [
  { id: "faces", label: "Facial Landmark Consistency" },
  { id: "eyes", label: "Ocular Micro-Movements" },
  { id: "lighting", label: "Lighting & Shadow Coherence" },
  { id: "compression", label: "Compression Artifacts" },
  { id: "temporal", label: "Temporal Frame Drift" },
  { id: "audio", label: "Audio-Visual Sync" },
];

interface ForensicTimelineProps {
  isProcessing: boolean;
}

export default function ForensicTimeline({
  isProcessing,
}: ForensicTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // ▶️ Progress timeline ONLY while processing
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev < SIGNALS.length - 1 ? prev + 1 : prev
      );
    }, 900);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // ⛔ Reset timeline when processing ENDS (async-safe)
  useEffect(() => {
    if (!isProcessing) {
      // defer reset to avoid sync state update in effect body
      requestAnimationFrame(() => setActiveIndex(0));
    }
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className="mt-8 rounded-xl border border-neutral-800 bg-black/40 p-4">
      <h3 className="mb-3 text-xs uppercase tracking-widest text-neutral-400">
        Forensic Signal Replay
      </h3>

      <div className="space-y-2">
        {SIGNALS.map((signal, index) => {
          const isActive = index === activeIndex;
          const isDone = index < activeIndex;

          return (
            <div key={signal.id} className="flex items-center gap-3">
              {/* Indicator */}
              <div className="relative h-3 w-3">
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-amber-400"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>

                <span
                  className={`block h-2 w-2 rounded-full ${
                    isDone
                      ? "bg-emerald-500"
                      : isActive
                      ? "bg-amber-400"
                      : "bg-neutral-700"
                  }`}
                />
              </div>

              {/* Label */}
              <motion.span
                className={`text-sm ${
                  isActive
                    ? "text-amber-300"
                    : isDone
                    ? "text-neutral-300"
                    : "text-neutral-600"
                }`}
                animate={{ opacity: isActive ? 1 : 0.6 }}
              >
                {signal.label}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
