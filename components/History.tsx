"use client"

import { FC } from "react"
import { SafeHistory, SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Container from "./Container"
import Heading from "./Heading"
import Navbar from "./navbar/Navbar"

interface IHistoryProps {
  currentUser?: SafeUser | null
  title?: string
  histories30: SafeHistory[]
  histories60: SafeHistory[]
  histories90: SafeHistory[]
  histories120: SafeHistory[]
}

const History: FC<IHistoryProps> = ({
  currentUser,
  title = "My Typing Histories",
  histories30,
  histories60,
  histories90,
  histories120,
}) => {
  const renderedHistories = (title: string, histories: SafeHistory[]) => {
    if (!histories.length) {
      return (
        <div className="flex flex-col gap-4 py-4 bg-neutral-800 p-4 rounded-xl">
          <p className="text-xl font-thin">
            Not found record of the time {title}
          </p>
        </div>
      )
    }

    const list = (
      <ul>
        {histories.map((history, index) => {
          return (
            <li key={index}>
              <div className="flex flex-row gap-2">
                <div className="w-24">{index + 1}</div>
                <div className="w-52">{history.userEmail}</div>
                <div className="w-32">{history.time}</div>
                <div className="w-32">{history.wpm}</div>
                <div className="w-32">{history.cpm}</div>
                <div className="w-32">{history.mistakes}</div>
              </div>
            </li>
          )
        })}
      </ul>
    )

    return (
      <div className="flex flex-col gap-4 py-4 bg-neutral-800 p-4 rounded-xl">
        <div className="text-xl font-semibold">Time: {title}</div>
        {list}
      </div>
    )
  }

  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44 space-y-3">
          <Heading title={title} />

          {renderedHistories("30", histories30)}

          {renderedHistories("60", histories60)}

          {renderedHistories("90", histories90)}

          {renderedHistories("120", histories120)}
        </div>
      </Container>
    </>
  )
}

export default History
