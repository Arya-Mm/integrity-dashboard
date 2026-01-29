"use client"

import { ReactNode } from "react"
import Noise from "./Noise"

export default function ClientShell({
  children
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Subtle background noise */}
      <Noise />

      {/* App content */}
      {children}
    </div>
  )
}
