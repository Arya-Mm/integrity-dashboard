/* eslint-disable @next/next/no-img-element */

"use client"
 
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const ACCEPTED_TYPES = [
  "video/mp4",
  "video/quicktime",
  "image/jpeg",
  "image/png"
]

const MAX_SIZE_MB = 50

export default function MediaIntake() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Unsupported file type. Upload MP4, MOV, JPG, or PNG."
    }

    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      return "File exceeds 50MB size limit."
    }

    return null
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setFileName(file.name)

    if (previewURL) {
      URL.revokeObjectURL(previewURL)
    }

    setPreviewURL(URL.createObjectURL(file))

    // 🔒 NO ANALYSIS HERE
    // 🔒 NO FAKE PIPELINE
    // 🔒 NO VERDICT
    // → backend upload comes later

    router.push("/dashboard")
  }

  return (
    <section
      id="media-intake"
      className="bg-black text-white flex flex-col items-center justify-center px-10 py-32"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold mb-10 tracking-wide"
      >
        Media Upload
      </motion.h2>

      <p className="text-gray-400 text-sm mb-8 max-w-2xl text-center">
        Upload a video or image. The forensic analysis begins in the dashboard.
      </p>

      <div className="w-full max-w-4xl border border-gray-700 rounded-xl bg-[#050505] p-8 space-y-6">
        {/* DROP ZONE */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={e => e.key === "Enter" && inputRef.current?.click()}
          className="border border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <p className="text-gray-300 tracking-wide">
            DROP MEDIA FILE OR CLICK TO UPLOAD
          </p>
          <p className="text-xs text-gray-500 mt-2">
            MP4 / MOV / JPG / PNG — MAX 50MB
          </p>

          {fileName && (
            <p className="text-xs text-indigo-400 mt-3">
              LOADED: {fileName}
            </p>
          )}
        </div>

        {/* PREVIEW */}
        {previewURL && (
          <div className="border border-gray-800 rounded-lg p-3 bg-black">
            {previewURL.includes("video") ? (
              <video
                src={previewURL}
                controls
                className="w-full rounded"
              />
            ) : (
              <img
                src={previewURL}
                alt="Uploaded preview"
                className="w-full rounded object-contain max-h-64"
              />
            )}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-xs text-red-400 border border-red-500/30 bg-red-500/10 p-3 rounded">
            {error}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onFileSelect}
      />
    </section>
  )
}
