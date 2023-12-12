"use client"

import { FC } from "react"
import { SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Container from "./Container"
import Heading from "./Heading"
import Navbar from "./navbar/Navbar"

interface IMyHistoryProps {
  currentUser?: SafeUser | null
}

const MyHistory: FC<IMyHistoryProps> = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44">
          <Heading title="My Typing Histories" />

          <div className="flex flex-col gap-4">120</div>
          <div className="flex flex-col gap-4">90</div>
          <div className="flex flex-col gap-4">60</div>
          <div className="flex flex-col gap-4">30</div>
        </div>
      </Container>
    </>
  )
}

export default MyHistory
