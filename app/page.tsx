"use client"

import Options from "./components/Options"
import Typing from "./components/Typing"
import useIsTyping from "./hooks/useIsTyping"
import { APP_NAME } from "./site_settings"

const Page = () => {
  const typing = useIsTyping()
  return (
    <>
      <Options />

      <h3
        className={`text-2xl font-semibold ${
          !typing.isTyping ? "text-neutral-400" : "text-transparent"
        } w-full text-center mb-9`}>
        {APP_NAME}
      </h3>
      <Typing />
    </>
  )
}

export default Page
