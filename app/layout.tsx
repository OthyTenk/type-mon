import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"

import Footer from "@/components/Footer"
import GameResultModal from "@/components/modals/GameResultModal"
import RegisterModal from "@/components/modals/RegisterModal"
import TypingResultModal from "@/components/modals/TypingResultModal"
import ToasterProvider from "@/providers/ToasterProvider"
import {
  APP_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/site_settings"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s - ${SITE_TITLE}`,
  },
  authors: [
    { name: "Othy Tenk", url: "https://portfolio.agula.xyz" },
    { name: "OkDo", url: "https://portfolio.agula.xyz" },
  ],
  metadataBase: new URL(SITE_URL.substring(0, SITE_URL.length - 1)),
  creator: "Othy Tenk | OkDo",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Typing speed test",
    "Typing speed test mongolia",
    "Typing speed mongolia",
    "Typing trainer",
    "Typing test",
    "Typing game",
    "Typing Mongolia",
    "Mongolia typing trainer",
    "Mongolia Typing",
  ],
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: APP_NAME,
    type: "website",
    images: "/opengraph-image.png",
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: APP_NAME,
    siteId: "@typemon",
    card: "summary_large_image",
    images: "/twitter-image.png",
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
        <GameResultModal />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
