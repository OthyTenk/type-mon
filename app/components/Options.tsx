import { FC, useEffect } from "react"
import useResultStatistic from "../hooks/useResultStatistic"
import { DEFAULT_LANG, DEFAULT_TIME } from "../site_settings"

const times = [30, 60, 90, 120]
const languages = ["en", "mn"]

const Options: FC = () => {
  const { maxTime, newMaxTime } = useResultStatistic()
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
              selectedTime === time ? "text-yellow-600" : ""
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
            className={`${selectedLanguage === lang ? "text-yellow-600" : ""}`}>
            {lang}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between ">
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
