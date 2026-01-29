"use client"

export default function ForensicLogPanel() {
  const lines = [
    "[BOOT] Pipeline initialized",
    "[TIER-0] Provenance analysis complete",
    "[OK] Face extracted",
    "[ML] rPPG, Identity, Depth models executed",
    "[FUSION] Verdict stabilized",
  ]

  return (
    <div className="border border-neutral-800 rounded-xl bg-black p-6 font-mono text-xs text-green-400">
      <p className="text-neutral-500 mb-2 tracking-widest">
        FORENSIC LOG
      </p>

      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  )
}
