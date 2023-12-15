import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import React from "react"
import Footer from "./components/Footer"
import RegisterModal from "./components/modals/RegisterModal"
import TypingResultModal from "./components/modals/TypingResultModal"
import "./globals.css"
import ToasterProvider from "./providers/ToasterProvider"
import {
  APP_NAME,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "./site_settings"

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
  creator: "Othy Tenk | OkDo",
  alternates: {
    canonical: SITE_URL,
  },
  keywords: [
    "Typing speed test",
    "Typing trainer",
    "Typing test",
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
    images: `${SITE_URL}opengraph-image.png`,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: APP_NAME,
    siteId: "@typemon",
    card: "summary_large_image",
    images: `${SITE_URL}twitter-image.png`,
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
