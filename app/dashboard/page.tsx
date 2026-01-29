    "use client"

    import { useState } from "react"
    import type { ForensicResult } from "@/lib/types"
    import { generateForensicPDF } from "@/lib/forensicPdf"

    import MediaUploadConsole from "@/components/dashboard/MediaUploadConsole"
    import JobWatcher from "@/components/dashboard/JobWatcher"
    import ProcessingScanner from "@/components/dashboard/ProcessingScanner"
    import VerdictPanel from "@/components/dashboard/VerdictPanel"
    import SignalBreakdown from "@/components/dashboard/SignalBreakdown"
    import ForensicTimeline from "@/components/dashboard/ForensicTimeline"
    import ConfidenceHUD from "@/components/dashboard/ConfidenceHUD"
    import JudgeProbabilityHUD from "@/components/dashboard/JudgeProbabilityHUD"
    import VerdictSlam from "@/components/dashboard/VerdictSlam"

    // ✅ NEW (analytics dashboard like image-3)
    import ForensicResultsDashboard from "@/components/dashboard/ForensicResultsDashboard"

    type Phase = "idle" | "processing" | "done"

    export default function DashboardPage() {
    const [phase, setPhase] = useState<Phase>("idle")
    const [jobId, setJobId] = useState<string | null>(null)
    const [result, setResult] = useState<ForensicResult | null>(null)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [showVerdict, setShowVerdict] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    return (
        <main className="min-h-screen bg-black flex justify-center pt-24">
        <div className="w-full max-w-5xl px-6 space-y-12">

            {/* HEADER */}
            <header>
            <h1 className="text-3xl font-bold tracking-widest">
                Media Verification Console
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl">
                Upload a video or image. The system extracts forensic signals
                and fuses them into an authenticity probability.
            </p>
            </header>

            {/* UPLOAD */}
            <MediaUploadConsole
            status={
                phase === "idle"
                ? "IDLE"
                : phase === "processing"
                ? "PROCESSING"
                : "DONE"
            }
            onJobStarted={(id, file) => {
                setUploadedFile(file)
                setJobId(id)
                setPhase("processing")
                setResult(null)
                setShowVerdict(false)
            }}
            />

            {/* PROCESSING */}
            {phase === "processing" && jobId && (
            <>
                <ProcessingScanner active />
                <ForensicTimeline isProcessing />

                <JobWatcher
                jobId={jobId}
                onComplete={(res) => {
                    setResult(res)
                    setPhase("done")
                    setTimeout(() => setShowVerdict(true), 180)
                }}
                />
            </>
            )}

            {/* FINAL */}
            {phase === "done" && result && (
            <>
                {/* Verdict slam stays untouched */}
                <VerdictSlam result={result} show={showVerdict}>
                <VerdictPanel
                    result={result}
                    onDownloadReport={async () => {
                    if (!uploadedFile) return
                    setIsGenerating(true)
                    await generateForensicPDF(result, uploadedFile)
                    setIsGenerating(false)
                    }}
                />
                </VerdictSlam>

                {/* 🔥 NEW: Image-3 style analytics dashboard */}
                <ForensicResultsDashboard
                result={result}
                onDownload={async () => {
                    if (!uploadedFile) return
                    setIsGenerating(true)
                    await generateForensicPDF(result, uploadedFile)
                    setIsGenerating(false)
                }}
                />

                {/* Existing components preserved */}
                <JudgeProbabilityHUD
                pReal={result.p_real}
                show={showVerdict}
                />

                <ConfidenceHUD result={result} />
                <SignalBreakdown />
            </>
            )}

            {/* PDF OVERLAY */}
            {isGenerating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
                <div className="rounded-xl border border-neutral-700 bg-black px-8 py-6 text-center">
                <p className="text-sm tracking-widest text-indigo-400">
                    GENERATING FORENSIC REPORT
                </p>
                <p className="mt-2 text-xs text-neutral-500">
                    Extracting frames & compiling evidence…
                </p>
                </div>
            </div>
            )}

        </div>
        </main>
    )
    }
