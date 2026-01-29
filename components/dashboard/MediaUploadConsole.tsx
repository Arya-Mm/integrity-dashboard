"use client"

import { useRef, useState } from "react"
import { analyzeVideo } from "@/lib/api"

type Status = "IDLE" | "PROCESSING" | "DONE"

interface Props {
  status: Status
  onJobStarted: (jobId: string, file: File) => void
}

export default function MediaUploadConsole({
  status,
  onJobStarted,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const startAnalysis = async (f: File) => {
    setLoading(true)
    try {
      const res = await analyzeVideo(f)
      onJobStarted(res.job_id, f)
    } catch (e) {
      console.error(e)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-neutral-700 bg-black/60 backdrop-blur-md shadow-[0_0_60px_rgba(0,0,0,0.8)]">

      {/* WINDOW BAR */}
      <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-3 tracking-wide">
            Integrity-FS / forensic-session
          </span>
        </div>

        <div
          className={`font-mono tracking-widest ${
            status === "IDLE"
              ? "text-emerald-400"
              : status === "PROCESSING"
              ? "text-amber-400"
              : "text-red-400"
          }`}
        >
          STATUS: {status}
        </div>
      </div>

      {/* DROP ZONE */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files?.[0]
          if (f) {
            setFile(f)
            startAnalysis(f)
          }
        }}
        className="m-6 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-neutral-600 px-6 py-14 text-center transition hover:border-neutral-400"
      >
        <p className="text-lg tracking-widest text-neutral-200">
          DROP MEDIA FILE OR CLICK TO INJECT
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          MP4 / MOV / JPG / PNG — MAX 50MB
        </p>

        {file && (
          <p className="mt-4 text-xs text-indigo-400">
            Selected: {file.name}
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="video/*,image/*"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) {
              setFile(f)
              startAnalysis(f)
            }
          }}
        />
      </div>

      {loading && (
        <div className="pb-6 text-center text-xs tracking-widest text-amber-400">
          UPLOADING & INITIALIZING PIPELINE…
        </div>
      )}
    </div>
  )
}
