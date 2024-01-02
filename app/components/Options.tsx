"use client"

import { FC } from "react"

import useGlobal from "@/store/useGlobal"
import { BiTimer } from "react-icons/bi"
import { GrLanguage } from "react-icons/gr"
import Language from "./Language"
import Times from "./Times"

const Options: FC = () => {
  const { isTyping } = useGlobal()

  return (
    <div
      className={`w-full md:mx-auto mt-16 md:mt-24 max-w-5xl flex flex-col mb-5 md:flex-row items-center justify-between md:px-3 ${
        isTyping ? "text-transparent" : ""
      }`}>
      <div className="flex flex-row gap-2 items-center">
        <BiTimer size={28} />
        <Times />
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GrLanguage size={20} />
        <Language />
      </div>
    </div>
  )
}

export default Options
