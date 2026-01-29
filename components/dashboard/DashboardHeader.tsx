"use client"

export default function DashboardHeader() {
  return (
    <header className="border-b border-gray-800 px-10 py-6 bg-[#050505]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl tracking-widest text-indigo-400">
            INTEGRITY — DASHBOARD
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Forensic media verification console
          </p>
        </div>

        <div className="text-xs text-gray-400 tracking-widest">
          STATUS: AWAITING MEDIA
        </div>
      </div>
    </header>
  )
}
