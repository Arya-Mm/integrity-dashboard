// lib/normalizeFromCLI.ts
import type { ForensicResult } from "@/lib/types"
import type { UISignal } from "@/lib/ui-types"

export function normalizeFromCLI(result: ForensicResult): UISignal[] {
  const t1 = result.tier1
  const t2 = result.tier2
  const t3 = result.tier3

  return [
    {
      key: "rppg",
      label: "Heart Rhythm (rPPG)",
      group: "BIOLOGICAL",
      value: Math.round((t1.rppg.confidence ?? 0) * 100),
      status: t1.rppg.valid ? "PASSED" : "FAILED",
      meta: `confidence ${(t1.rppg.confidence ?? 0).toFixed(2)}`,
    },
    {
      key: "micro_expression",
      label: "Micro-expressions",
      group: "BIOLOGICAL",
      status: t1.micro_expression ? "PASSED" : "FAILED",
    },
    {
      key: "eye_convergence",
      label: "Eye Convergence",
      group: "BIOLOGICAL",
      status: t1.eye_convergence ? "PASSED" : "FAILED",
    },
    {
      key: "lighting",
      label: "Lighting Consistency",
      group: "PHYSICAL",
      status: t2.lighting ? "PASSED" : "ANOMALOUS",
    },
    {
      key: "depth_motion",
      label: "Depth Motion Realism",
      group: "PHYSICAL",
      status: t2.depth_motion ? "PASSED" : "ANOMALOUS",
    },
    {
      key: "identity",
      label: "Identity Consistency",
      group: "TEMPORAL",
      value: Math.round(t3.identity.mean_cosine * 100),
      status: t3.identity.mean_cosine > 0.98 ? "PASSED" : "DETECTED",
      meta: `cosine ${t3.identity.mean_cosine.toFixed(3)}`,
    },
    {
      key: "phase",
      label: "Phase Coherence",
      group: "TEMPORAL",
      value: Math.round(t3.phase.corr * 100),
      status: t3.phase.corr > 0.7 ? "PASSED" : "ANOMALOUS",
    },
    {
      key: "lag",
      label: "Temporal Lag",
      group: "TEMPORAL",
      value: Math.round((1 - t3.lag.lag) * 100),
      status: t3.lag.lag < 0.2 ? "PASSED" : "ANOMALOUS",
    },
  ]
}
