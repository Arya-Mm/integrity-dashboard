export type SignalStatus =
  | "PASSED"
  | "FAILED"
  | "ANOMALOUS"
  | "DETECTED"
  | "INFO"

export type SignalGroup =
  | "BIOLOGICAL"
  | "PHYSICAL"
  | "TEMPORAL"
  | "AI"

export type UISignal = {
  key: string
  label: string
  group: SignalGroup
  value?: number
  status: SignalStatus
  meta?: string
}
export type TimelineStageStatus =
  | "PASSED"
  | "ANOMALOUS"
  | "DETECTED"
  | "FAILED"

export interface TimelineStage {
  key: string
  label: string
  status: TimelineStageStatus
  description: string
}
