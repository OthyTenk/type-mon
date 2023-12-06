"use client"

import { FC, useEffect } from "react"
import useResultStatistic from "../hooks/useResultStatistic"
import { DEFAULT_LANG, DEFAULT_TIME } from "../site_settings"
import useIsTyping from "../hooks/useIsTyping"

const times = [30, 60, 90, 120]
const languages = ["en", "mn"]

const Options: FC = () => {
  const { maxTime, newMaxTime } = useResultStatistic()
  const { isTyping } = useIsTyping()
  const selectedTime =
    maxTime > 0 && maxTime !== undefined ? maxTime : DEFAULT_TIME

  useEffect(() => {
    if (maxTime === undefined) {
      newMaxTime(DEFAULT_TIME)
    }
  }, [newMaxTime, maxTime])

  const onChangeTime = (value: number) => {
    newMaxTime(value)
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

  const renderedLanguages = ({
    selectedLanguage,
  }: {
    selectedLanguage: string
  }) => {
    return (
      <ul className="gap-2 flex">
        {languages.map((lang, index) => (
          <li
            key={`time-${index}`}
            className={`${
              selectedLanguage === lang
                ? isTyping
                  ? "text-transparent"
                  : "text-yellow-600"
                : ""
            }`}>
            {lang}
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
      <div className="flex flex-row gap-2">
        <span>Time:</span>
        {renderedTimes({ selectedTime })}
      </div>
      <div className="flex flex-row gap-2">
        <span>Language:</span>
        {renderedLanguages({ selectedLanguage: DEFAULT_LANG })}
      </div>
    </div>
  )
}

export default Options
