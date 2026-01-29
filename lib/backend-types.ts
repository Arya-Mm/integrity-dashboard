// ===== Tier 1 =====
export interface Tier1 {
  rppg: {
    valid: boolean
    confidence?: number
  }
  micro_expression: boolean
  eye_convergence: boolean
}

// ===== Tier 2 =====
export interface Tier2 {
  lighting: boolean
  depth_motion: boolean
}

// ===== Tier 3 =====
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

// ===== Fusion =====
export interface Fusion {
  verdict: string
  p_real: number
  contributions: Record<string, number>
}
