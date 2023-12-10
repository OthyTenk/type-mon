"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { SafeTypingText } from "../types"
import AppTitle from "./AppTitle"
import Options from "./Options"
import Typing from "./Typing"

interface IHomeSectionProps {
  texts: SafeTypingText[]
}

const HomeSection: FC<IHomeSectionProps> = ({ texts }) => {
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
      <Options />
      <AppTitle />
      <Typing currentText={currentText} changeText={getRandomIndex} />
    </>
  )
}

export default HomeSection
