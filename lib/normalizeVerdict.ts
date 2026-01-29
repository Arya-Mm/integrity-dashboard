import type { VerdictUI, ForensicResult } from "@/lib/types"

export function buildVerdictUI(
  result: ForensicResult
): VerdictUI {
  return {
    label: result.verdict,
    confidence: result.p_real,
    summary:
      result.verdict === "REAL_PROCESSED"
        ? "Signals indicate authentic source with post-processing artifacts."
        : result.verdict === "FAKE"
        ? "Multiple biological and temporal inconsistencies detected."
        : "Signals show mixed authenticity indicators."
  }
}
