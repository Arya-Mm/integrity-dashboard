"use client"

import { ForensicResult as ForensicResultType } from "@/lib/types"

interface Props {
  result: ForensicResultType
}

export default function ForensicResult({ result }: Props) {
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">
        VERDICT —{" "}
        <span
          className={
            result.verdict.includes("FAKE")
              ? "text-red-400"
              : "text-green-400"
          }
        >
          {result.verdict}
        </span>
      </div>

      <div className="text-sm text-gray-400">
        P(real): {result.p_real.toFixed(3)}
      </div>

<a
  href={`http://localhost:8000/${result.report_path}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-4 px-4 py-2 border border-neutral-700 rounded hover:bg-neutral-900"
>
  Download Forensic Report
</a>

    </div>
  )
}
