"use client"

import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode
} from "react"

import type { ForensicResult } from "@/lib/types"


type ForensicSessionContextType = {
  result: ForensicResult | null
  setResult: (r: ForensicResult) => void
}

const ForensicSessionContext =
  createContext<ForensicSessionContextType | null>(null)

export function ForensicSessionProvider({
  children
}: {
  children: ReactNode
}) {
  const [result, setResult] =
    useState<ForensicResult | null>(null)

  const value = useMemo(
    () => ({
      result,
      setResult
    }),
    [result]
  )

  return (
    <ForensicSessionContext.Provider value={value}>
      {children}
    </ForensicSessionContext.Provider>
  )
}

export function useForensicSession() {
  const ctx = useContext(ForensicSessionContext)
  if (!ctx) {
    throw new Error(
      "useForensicSession must be used inside provider"
    )
  }
  return ctx
}
