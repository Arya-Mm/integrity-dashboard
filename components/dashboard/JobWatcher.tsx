"use client"

import { useEffect } from "react"
import { getJobResult } from "@/lib/api"
import type { ForensicResult } from "@/lib/types"

export default function JobWatcher({
  jobId,
  onComplete,
}: {
  jobId: string
  onComplete: (r: ForensicResult) => void
}) {
  useEffect(() => {
    const id = setInterval(async () => {
      const res = await getJobResult(jobId)

      if ("verdict" in res) {
        clearInterval(id)
        onComplete(res)
      }
    }, 1500)

    return () => clearInterval(id)
  }, [jobId, onComplete])

  return null
}
