import type { ForensicResult } from "@/lib/types"
import type { TimelineStage } from "@/lib/ui-types"

export function normalizeTimeline(
  result: ForensicResult
): TimelineStage[] {
  const { tier1, tier2, tier3, verdict } = result

  return [
    {
      key: "biological",
      label: "Biological Signals",
      status:
        tier1.rppg.valid &&
        tier1.micro_expression &&
        tier1.eye_convergence
          ? "PASSED"
          : "FAILED",
      description:
        "Heart rhythm, micro-expressions, and eye convergence analysis",
    },

    {
      key: "physical",
      label: "Physical Consistency",
      status:
        tier2.lighting && tier2.depth_motion
          ? "PASSED"
          : "ANOMALOUS",
      description:
        "Lighting stability and depth motion realism",
    },

    {
      key: "temporal",
      label: "Temporal Consistency",
      status:
        tier3.identity.mean_cosine > 0.98 &&
        tier3.phase.corr > 0.7 &&
        tier3.lag.lag < 0.2
          ? "PASSED"
          : "DETECTED",
      description:
        "Identity coherence, phase correlation, and temporal lag",
    },

    {
      key: "fusion",
      label: "Final Fusion Verdict",
      status:
        verdict.includes("FAKE")
          ? "FAILED"
          : verdict.includes("SUSPICIOUS")
          ? "DETECTED"
          : "PASSED",
      description:
        "Cross-model forensic fusion decision",
    },
  ]
}
