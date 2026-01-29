import type { JobProgress, ForensicResult } from "./types"

const API = "http://localhost:8000"

export async function analyzeVideo(file: File) {
  const fd = new FormData()
  fd.append("file", file)

  const res = await fetch(`${API}/analyze`, {
    method: "POST",
    body: fd,
  })

  return res.json() as Promise<{ job_id: string }>
}

export async function getJobResult(
  jobId: string
): Promise<JobProgress | ForensicResult> {
  const res = await fetch(`${API}/result/${jobId}`)
  return res.json()
}
