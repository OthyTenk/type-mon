import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"
import TypingResultModal from "./components/modals/TypingResultModal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Typing, Type trainer, Typing speed test",
  description:
    "agula typing, typing speed game, Improve your Typing Speed, free typing test, Mongolian typing test",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} font-mono bg-white text-black dark:bg-[#1f1f1f] dark:text-white h-full selection:bg-gray-50 dark:selection:bg-gray-800`}>
        <TypingResultModal />
        <main>{children}</main>
      </body>
    </html>
  )
}
