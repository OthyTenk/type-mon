"use client"

import { FC } from "react"
import { SafeHistory, SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Container from "./Container"
import Heading from "./Heading"
import Navbar from "./navbar/Navbar"

interface IMyHistoryProps {
  currentUser?: SafeUser | null
  histories30: SafeHistory[]
  histories60: SafeHistory[]
  histories90: SafeHistory[]
  histories120: SafeHistory[]
}

const MyHistory: FC<IMyHistoryProps> = ({
  currentUser,
  histories30,
  histories60,
  histories90,
  histories120,
}) => {
  const renderedHistories = (histories: SafeHistory[]) => {
    return (
      <ul>
        {histories.map((history, index) => {
          return (
            <li key={index}>
              <div className="flex flex-row gap-2">
                <div className="w-24">{index + 1}</div>
                <div className="w-40">{history.userEmail}</div>
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
  }
  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44 gap-4">
          <Heading title="My Typing Histories" />

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">30</div>
            {renderedHistories(histories30)}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">60</div>
            {renderedHistories(histories60)}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">90</div>
            {renderedHistories(histories90)}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">120</div>
            {renderedHistories(histories120)}
          </div>
        </div>
      </Container>
    </>
  )
}

export default MyHistory
