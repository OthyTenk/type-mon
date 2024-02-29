"use client"

import { FC, useCallback, useEffect, useState } from "react"

import { SafeTypingText, SafeUser } from "@/types"
import AppTitle from "./AppTitle"
import Typing from "./Typing"
import Navbar from "./navbar/Navbar"

interface IHomeSectionProps {
  texts: SafeTypingText[]
  currentUser?: SafeUser | null
}

const HomeSection: FC<IHomeSectionProps> = ({ texts, currentUser = null }) => {
  const [currentText, setCurrentText] = useState("")

  const getRandomIndex = useCallback(() => {
    let ranIndex = Math.floor(Math.random() * texts.length)
    if (ranIndex > texts.length) ranIndex = 0

    setCurrentText(texts[ranIndex].sentence)
  }, [texts])

  useEffect(() => {
    getRandomIndex()
  }, [texts, getRandomIndex])

  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Typing
        currentText={currentText}
        currentUserEmail={currentUser?.email ?? null}
        changeText={getRandomIndex}
      />
    </>
  )
}

export default HomeSection
