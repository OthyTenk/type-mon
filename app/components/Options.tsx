"use client"

import { FC } from "react"

import useGlobal from "@/store/useGlobal"
import { BiTimer } from "react-icons/bi"
import { GrLanguage } from "react-icons/gr"
import Language from "./Language"

const times = [30, 60, 90, 120]

const Options: FC = () => {
  const { isTyping, time, newTime } = useGlobal()

  const onChangeTime = (value: number) => {
    newTime(value)
  }

  const renderedTimes = ({ selectedTime }: { selectedTime: number }) => {
    return (
      <ul className="gap-2 flex">
        {times.map((time, index) => (
          <li
            key={`time-${index}`}
            onClick={() => onChangeTime(time)}
            className={`${
              selectedTime === time
                ? isTyping
                  ? "text-transparent"
                  : "text-yellow-600"
                : ""
            } cursor-pointer`}>
            {time}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      className={`w-full md:mx-auto mt-16 md:mt-24 max-w-5xl flex flex-col mb-5 md:flex-row items-center justify-between md:px-3 ${
        isTyping ? "text-transparent" : ""
      }`}>
      <div className="flex flex-row gap-2 items-center">
        <BiTimer size={28} />

        {renderedTimes({ selectedTime: time })}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <GrLanguage size={20} />
        <Language />
      </div>
    </div>
  )
}

export default Options
