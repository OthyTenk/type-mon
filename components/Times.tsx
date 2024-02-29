import useGlobal from "@/store/useGlobal"

const times = [30, 60, 90, 120]

const Times = () => {
  const { isTyping, time: selectedTime, newTime } = useGlobal()

  return (
    <ul className="gap-2 flex">
      {times.map((time, index) => (
        <li
          key={`time-${index}`}
          onClick={() => newTime(time)}
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

export default Times
