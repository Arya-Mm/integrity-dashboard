import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import SmoothScroll from "../components/layout/SmoothScroll"
import ClientShell from "../components/layout/ClientShell"
import { ForensicSessionProvider } from "../components/system/ForensicSession"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Integrity UI",
  description: "Forensic Interface for Synthetic Media Risk Analysis"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ForensicSessionProvider>
          <ClientShell>
            <SmoothScroll>{children}</SmoothScroll>
          </ClientShell>
        </ForensicSessionProvider>
      </body>
    </html>
  )
}
