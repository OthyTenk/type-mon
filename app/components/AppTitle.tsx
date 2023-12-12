"use client"

import Link from "next/link"
import useIsTyping from "../hooks/useIsTyping"
import { APP_NAME } from "../site_settings"
import Logo from "./Logo"

const AppTitle = () => {
  const typing = useIsTyping()

  return (
    <Link href="/">
      <div className="fill-neutral-400 flex gap-2 flex-row items-center justify-center mb-9">
        {!typing.isTyping && <Logo className="object-fit h-8 w-20" />}
        <h3
          className={`text-2xl font-semibold ${
            !typing.isTyping ? "text-neutral-400" : "text-transparent"
          } text-center`}>
          {APP_NAME}
        </h3>
      </div>
    </Link>
  )
}

export default AppTitle
