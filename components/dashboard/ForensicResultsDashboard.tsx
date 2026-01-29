"use client"

import type { ForensicResult } from "@/lib/types"

/* ================= TYPES ================= */

interface Props {
  result: ForensicResult
  onDownload: () => void
}

/* ================= SIGNAL EXPLANATIONS ================= */

const SIGNAL_EXPLANATION: Record<
  string,
  string
> = {
  rppg:
    "Remote photoplethysmography detects natural blood-flow rhythm from skin color changes. Synthetic media struggles to reproduce stable physiological pulse signals.",
  micro_expression:
    "Micro-expressions are involuntary facial muscle movements that occur faster than conscious control and are difficult for generative models to fake.",
  eye_convergence:
    "Eye convergence checks binocular gaze alignment. AI-generated faces often show subtle geometric inconsistencies between eyes.",
  lighting:
    "Lighting consistency evaluates whether shadows and highlights obey physical light direction and intensity laws.",
  depth_motion:
    "Depth-motion coherence checks if object depth behaves realistically during motion. AI videos often break depth continuity.",
  identity:
    "Identity persistence measures whether facial identity remains stable across the entire timeline without drift.",
  phase:
    "Phase continuity detects temporal signal alignment. Discontinuities indicate synthetic frame generation.",
  lag:
    "Pipeline lag analysis detects temporal artifacts caused by frame synthesis delays.",
}

/* ================= TOOLTIP ================= */

function Tooltip({ text }: { text: string }) {
  return (
    <span
      className="
        pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2
        whitespace-nowrap rounded-md border border-neutral-700
        bg-black px-2 py-1 text-[10px] text-neutral-200
        opacity-0 group-hover:opacity-100 transition
        z-30 max-w-xs text-center
      "
    >
      {text}
    </span>
  )
}

/* ================= METRIC CARD ================= */

function MetricCard({
  label,
  value,
  tip,
}: {
  label: string
  value: string
  tip: string
}) {
  return (
    <div
      className="
        group relative min-w-0
        rounded-xl border border-neutral-700
        bg-black/50 p-4 overflow-hidden
      "
    >
      <Tooltip text={tip} />

      <p className="text-xs uppercase tracking-widest text-neutral-400">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-white leading-tight break-all">
        {value.replace("_", " ")}
      </p>
    </div>
  )
}

/* ================= ANIMATED BAR ================= */

function AnimatedBar({
  value,
  tip,
}: {
  value: number
  tip: string
}) {
  return (
    <div className="group relative mt-2 h-2 w-full rounded bg-neutral-800 overflow-hidden">
      <Tooltip text={tip} />

      <div
        className={`
          h-2 rounded transition-all duration-700 ease-out
          ${
            value < 0.4
              ? "bg-red-500"
              : value < 0.7
              ? "bg-yellow-400"
              : "bg-green-500"
          }
        `}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  )
}

/* ================= SIGNAL CARD ================= */

function SignalCard({
  name,
  value,
}: {
  name: string
  value: number
}) {
  const explanation =
    SIGNAL_EXPLANATION[name] ??
    "This signal contributes probabilistically to the final authenticity verdict."

  return (
    <div
      className="
        group relative min-w-0
        rounded-xl border border-neutral-800
        bg-black/40 p-4 overflow-hidden
      "
    >
      <Tooltip text={explanation} />

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs tracking-widest text-neutral-400 break-all">
          {name.replace("_", " ").toUpperCase()}
        </p>
        <span className="text-xs text-neutral-400 shrink-0">
          {(value * 100).toFixed(1)}%
        </span>
      </div>

      <AnimatedBar
        value={value}
        tip="Normalized contribution strength (green = reliable, red = suspicious)"
      />
    </div>
  )
}

/* ================= MAIN DASHBOARD ================= */

export default function ForensicResultsDashboard({
  result,
  onDownload,
}: Props) {
  const fusion = result.fusion as {
    contributions?: Record<string, number>
  }

  const signals = fusion?.contributions ?? {}

  return (
    <section
      className="
        relative
        w-full h-[80vh]
        rounded-2xl border border-neutral-700
        bg-black/60 backdrop-blur
        p-6
        grid grid-rows-[auto_auto_1fr_auto]
        gap-5
      "
    >
      {/* HEADER */}
      <header className="group relative flex items-center justify-between">
        <Tooltip text="Unified forensic summary of all extracted signals and the final system decision" />

        <h2 className="text-sm tracking-widest text-neutral-400">
          FORENSIC RESULTS DASHBOARD
        </h2>
        <span className="text-xs text-neutral-500">
          INTEGRITY-FS
        </span>
      </header>

      {/* TOP METRICS */}
      <div className="grid grid-cols-4 gap-4 min-w-0">
        <MetricCard
          label="Verdict"
          value={result.verdict}
          tip="Final classification based on fused forensic evidence"
        />

        <MetricCard
          label="P(real)"
          value={`${(result.p_real * 100).toFixed(1)}%`}
          tip="Probability that the media is authentic"
        />

        <MetricCard
          label="Risk"
          value={
            result.p_real < 0.4
              ? "HIGH"
              : result.p_real < 0.7
              ? "MEDIUM"
              : "LOW"
          }
          tip="Judicial risk assessment derived from authenticity confidence"
        />

        <MetricCard
          label="Signals"
          value={Object.keys(signals).length.toString()}
          tip="Total independent forensic signals used in analysis"
        />
      </div>

      {/* SIGNAL GRID */}
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(signals).map(([name, value]) => (
            <SignalCard
              key={name}
              name={name}
              value={value}
            />
          ))}
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="group relative flex justify-end">
        <Tooltip text="Generate a court-ready forensic PDF report with all evidence and explanations" />

        <button
          onClick={onDownload}
          className="
            rounded-lg border border-neutral-600
            px-6 py-3 text-xs tracking-widest
            hover:border-white hover:text-white
            transition
          "
        >
          DOWNLOAD FORENSIC REPORT
        </button>
      </div>
    </section>
  )
}
