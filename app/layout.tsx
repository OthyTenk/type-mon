import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"
import Footer from "./components/Footer"
import RegisterModal from "./components/modals/RegisterModal"
import TypingResultModal from "./components/modals/TypingResultModal"
import "./globals.css"
import ToasterProvider from "./providers/ToasterProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Typing, Type trainer, Typing speed test",
    template: "%s - Typing, Type trainer, Typing speed test",
  },
  description:
    "agula typing, typing speed game, Improve your Typing Speed, free typing test, Mongolian typing test",
  // twitter: {
  //   card: "summary_large_image",
  // },
  openGraph: {
    images: ["./opengraph-image.png"],
    title: "Typing, Type trainer, Typing speed test",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} font-mono bg-[#1E1E1E] text-white h-full selection:bg-gray-800`}>
        <ToasterProvider />
        <TypingResultModal />
        <RegisterModal />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
