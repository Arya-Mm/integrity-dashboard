import jsPDF from "jspdf"
import autoTable, { RowInput } from "jspdf-autotable"
import type { ForensicResult } from "@/lib/types"

/* ===============================
   TYPES
================================ */

type FusionData = {
  contributions: Record<string, number>
}

type ExtractedFrame = {
  src: string
  ts: number
}

/* ===============================
   SIGNAL METADATA
================================ */

const SIGNAL_META: Record<
  string,
  { tier: string; description: string }
> = {
  rppg: {
    tier: "Tier 1 — Physiological",
    description:
      "Remote photoplethysmography consistency derived from subtle skin color oscillations.",
  },
  micro_expression: {
    tier: "Tier 1 — Physiological",
    description:
      "Detection of involuntary micro facial muscle movements.",
  },
  eye_convergence: {
    tier: "Tier 1 — Physiological",
    description:
      "Binocular gaze convergence stability across frames.",
  },
  lighting: {
    tier: "Tier 2 — Visual",
    description:
      "Physical consistency of light direction, intensity, and shadow behavior.",
  },
  depth_motion: {
    tier: "Tier 2 — Visual",
    description:
      "Depth coherence under motion parallax constraints.",
  },
  identity: {
    tier: "Tier 3 — Temporal",
    description:
      "Identity embedding stability across the full temporal window.",
  },
  phase: {
    tier: "Tier 3 — Temporal",
    description:
      "Phase continuity of temporal frequency-domain signals.",
  },
  lag: {
    tier: "Tier 3 — Temporal",
    description:
      "Temporal lag artifacts caused by synthetic frame interpolation.",
  },
}

/* ===============================
   HELPERS
================================ */

function verdict(v: number): "PASS" | "FAIL" {
  return v >= 0.5 ? "PASS" : "FAIL"
}

function drawBar(doc: jsPDF, x: number, y: number, value: number) {
  const w = 100
  const h = 5

  doc.setFillColor(220, 220, 220)
  doc.rect(x, y, w, h, "F")

  if (value < 0.4) doc.setFillColor(200, 0, 0)
  else if (value < 0.7) doc.setFillColor(220, 160, 0)
  else doc.setFillColor(0, 140, 0)

  doc.rect(x, y, w * value, h, "F")
  doc.rect(x, y, w, h)
}

async function extractFramesFromVideo(
  file: File,
  timestamps: number[]
): Promise<ExtractedFrame[]> {
  const video = document.createElement("video")
  video.src = URL.createObjectURL(file)
  video.muted = true

  await new Promise<void>((res) => {
    video.onloadedmetadata = () => res()
  })

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  const frames: ExtractedFrame[] = []

  for (const ts of timestamps) {
    video.currentTime = Math.min(ts, video.duration - 0.1)

    await new Promise<void>((res) => {
      video.onseeked = () => res()
    })

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    frames.push({
      src: canvas.toDataURL("image/jpeg", 0.8),
      ts,
    })
  }

  URL.revokeObjectURL(video.src)
  return frames
}

/* ===============================
   MAIN EXPORT
================================ */

export async function generateForensicPDF(
  result: ForensicResult,
  file: File
): Promise<void> {
  const doc = new jsPDF()
  let y = 18

  /* ---------- HEADER ---------- */

  doc.setFontSize(16)
  doc.text("INTEGRITY-FS — FORENSIC ANALYSIS REPORT", 14, y)
  y += 10

  doc.setFontSize(10)
  doc.text(`Case ID: ${result.job_id}`, 14, y)
  y += 6

  doc.text(`Media: ${file.name}`, 14, y)
  y += 6

  doc.text(`Verdict: ${result.verdict}`, 14, y)
  y += 6

  doc.text(`P(real): ${(result.p_real * 100).toFixed(2)}%`, 14, y)
  y += 6

  doc.text(`Generated: ${new Date().toISOString()}`, 14, y)
  y += 10

  /* ---------- FUSION ---------- */

  const fusion = result.fusion as FusionData | undefined
  if (!fusion || !fusion.contributions) {
    doc.text("ERROR: Fusion data missing.", 14, y)
    doc.save("forensic_report.pdf")
    return
  }

  /* ---------- EXTRACT FRAMES ---------- */

  const baseFrames = await extractFramesFromVideo(file, [1, 3, 5])

  const framesBySignal: Record<string, ExtractedFrame[]> = {}
  Object.keys(fusion.contributions).forEach((k) => {
    framesBySignal[k] = baseFrames
  })

  /* ---------- GROUP BY TIER ---------- */

  const tiers: Record<string, { name: string; value: number }[]> = {}

  for (const [signal, value] of Object.entries(
    fusion.contributions
  )) {
    const meta = SIGNAL_META[signal]
    if (!meta) continue

    if (!tiers[meta.tier]) tiers[meta.tier] = []
    tiers[meta.tier].push({ name: signal, value })
  }

  /* ---------- RENDER ---------- */

  for (const [tier, signals] of Object.entries(tiers)) {
    doc.setFontSize(13)
    doc.text(tier, 14, y)
    y += 6

    const table: RowInput[] = signals.map((s) => [
      s.name,
      s.value.toFixed(3),
      verdict(s.value),
    ])

    autoTable(doc, {
      startY: y,
      head: [["Signal", "Score", "Status"]],
      body: table,
      styles: { fontSize: 9 },
      didParseCell(data) {
        if (data.column.index === 2) {
          data.cell.styles.textColor =
            data.cell.text[0] === "PASS"
              ? [0, 140, 0]
              : [200, 0, 0]
        }
      },
    })

    y = (doc.lastAutoTable?.finalY ?? y) + 6

    for (const s of signals) {
      const meta = SIGNAL_META[s.name]

      doc.setFontSize(9)
      doc.text(`Signal: ${s.name}`, 14, y)
      y += 4

      doc.text(meta.description, 14, y, {
        maxWidth: 180,
      })
      y += 6

      drawBar(doc, 14, y, s.value)
      y += 8

      const frames = framesBySignal[s.name] || []
      let x = 14

      for (const f of frames) {
        doc.addImage(f.src, "JPEG", x, y, 40, 30)
        doc.text(`t=${f.ts.toFixed(1)}s`, x, y + 34)
        x += 46
      }

      y += 42

      if (y > 260) {
        doc.addPage()
        y = 20
      }
    }

    y += 6
  }

  /* ---------- SIGNATURE ---------- */

  if (y > 230) {
    doc.addPage()
    y = 20
  }

  doc.setFontSize(10)
  doc.text("Examiner:", 14, y)
  y += 6
  doc.text("INTEGRITY-FS Automated Forensic Engine", 14, y)
  y += 6
  doc.text("Signature: ____________________________", 14, y)
  y += 6
  doc.text("Date: _________________________________", 14, y)

  /* ---------- SAVE ---------- */

  doc.save(`${file.name}_forensic_report.pdf`)
}
