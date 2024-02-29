"use client"

import { FC } from "react"

import useGlobal from "@/store/useGlobal"
import { BiTimer } from "react-icons/bi"
import { FaGamepad } from "react-icons/fa6"
import { GrLanguage } from "react-icons/gr"
import Language from "./Language"
import Times from "./Times"

const Options: FC = () => {
  const { isTyping } = useGlobal()

  return (
    <div
      className={`w-full md:mx-auto gap-2 mt-10 md:mt-24 max-w-5xl flex flex-col mb-5 md:flex-row items-center justify-between md:px-3 ${
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

      <div className="flex flex-row gap-2 items-center text-gray-500">
        {/* <div className="flex flex-row gap-2 items-center hover:text-yellow-600"> */}
        <FaGamepad size={24} />
        Game
        {/* <Link href="/game" className="hover:underline ">
          Game
        </Link> */}
      </div>
    </div>
  )
}

export default Options
