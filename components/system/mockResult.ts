import type { ForensicResult } from "@/lib/types"

export const mockResult: ForensicResult = {
  job_id: "mock",
  video_name: "sample.mp4",
  verdict: "REAL_PROCESSED",
  p_real: 0.336,

  tier0: {},
  tier1: {
    rppg: { valid: true, confidence: 0.31 },
    micro_expression: true,
    eye_convergence: true,
  },
  tier2: {
    lighting: true,
    depth_motion: true,
  },
  tier3: {
    identity: { mean_cosine: 0.995 },
    phase: { corr: 0.9 },
    lag: { lag: 0.1 },
  },
  fusion: {},
  report_path: "reports/sample.mp4_forensic.pdf",
}
