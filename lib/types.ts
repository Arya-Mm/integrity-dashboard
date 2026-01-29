// ================= JOB =================
export type JobStage =
  | "queued"
  | "loading_video"
  | "provenance"
  | "face_processing"
  | "ml_pipeline"
  | "finalizing"
  | "done"
  | "error"

export interface JobProgress {
  status: "queued" | "running" | "done" | "error"
  stage: JobStage
  progress: number
  error?: string
}

// ================= VERDICT =================
export type VerdictLabel =
  | "REAL"
  | "REAL_PROCESSED"
  | "FAKE"
  | "SUSPICIOUS"

export interface VerdictUI {
  label: VerdictLabel
  confidence: number // 0–1
  summary: string
}

// ================= TIERS =================
export interface Tier1 {
  rppg: {
    valid: boolean
    confidence?: number
  }
  micro_expression: boolean
  eye_convergence: boolean
}

export interface Tier2 {
  lighting: boolean
  depth_motion: boolean
}

export interface Tier3 {
  identity: {
    mean_cosine: number
  }
  phase: {
    corr: number
  }
  lag: {
    lag: number
  }
}

// ================= FINAL RESULT =================
export interface ForensicResult {
  job_id: string
  video_name: string

  verdict: VerdictLabel
  p_real: number

  tier0: unknown          // fine to keep raw
  tier1: Tier1            // 🔥 FIXED
  tier2: Tier2            // 🔥 FIXED
  tier3: Tier3            // 🔥 FIXED
  fusion: unknown

  report_path: string

  verdict_ui?: VerdictUI
}
