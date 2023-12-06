import { FC } from "react"

interface ITimeTickProps {
  timeLeft?: number
}

const TimeTick: FC<ITimeTickProps> = ({ timeLeft = 0 }) => {
  return (
    <div className="font-thin text-2xl text-right ml-2 mb-7 text-yellow-600">
      {timeLeft}s
    </div>
  )
}

export default TimeTick
