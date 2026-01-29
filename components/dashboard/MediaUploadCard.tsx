"use client"

import { useState } from "react"
import { analyzeVideo } from "@/lib/api"

type Props = {
  onJobStarted: (jobId: string) => void
}

export default function MediaUploadCard({ onJobStarted }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    try {
      const res = await analyzeVideo(file)
      onJobStarted(res.job_id)
    } catch (e) {
      console.error(e)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-neutral-800 p-6 rounded-xl bg-black">
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-50"
      >
        {loading ? "Uploading…" : "Analyze Video"}
      </button>
    </div>
  )
}
