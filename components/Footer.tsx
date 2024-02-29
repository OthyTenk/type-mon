"use client"

import Link from "next/link"
import { APP_NAME } from "@/site_settings"
import useGlobal from "@/store/useGlobal"

const Footer = () => {
  const { isTyping } = useGlobal()

  if (isTyping) {
    return null
  }
  const year = new Date()

  return (
    <div className="max-w-5xl md:mx-auto text-center md:px-5 mt-16 flex flex-col md:flex-row justify-center md:justify-between">
      <div className="text-sm font-thin font-serif text-neutral-300">
        Created & Prepared by{" "}
        <Link
          href="https://portfolio.agula.xyz"
          target="_blank"
          className="text-yellow-600 hover:text-neutral-300">
          OkDo
        </Link>
      </div>

      <div className="mt-3 md:mt-0 text-sm">
        {APP_NAME}. {year.getFullYear()}
      </div>
    </div>
  )
}

export default Footer
