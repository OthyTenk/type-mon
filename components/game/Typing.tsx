"use client"

import {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import useGlobal from "@/store/useGlobal"

import { pusherClient } from "@/libs/pusher"
import axios from "axios"
import OpponentCursor from "./OpponentCursor"

interface ITypingProps {
  currentText: string
  currentUserId: string
}

const Typing: FC<ITypingProps> = ({ currentText, currentUserId }) => {
  const { stopType, startType, time } = useGlobal()

  const inputRef = useRef<HTMLInputElement>(null)
  const activeLetterRef = useRef<HTMLSpanElement>()
  const [position, setPosition] = useState(0)

  const CurrentPositionStyle = "border-l-2 border-yellow-400 animate-pulse"

  const [typingText, setTypingText] = useState<string | ReactElement[]>("")
  const [inpFieldValue, setInpFieldValue] = useState("")
  const [timeLeft, setTimeLeft] = useState(time)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const loadParagraph = useCallback(() => {
    const content = Array.from(currentText).map((letter, index) => (
      <span
        key={index}
        ref={(element) => {
          index === 0 && (activeLetterRef.current = element || undefined)
        }}
        className={`leading-8 ${index === 0 ? CurrentPositionStyle : ""}`}>
        {position === index && <OpponentCursor />}
        {letter}
      </span>
    ))
    setTypingText(content)

    setInpFieldValue("")
    setCharIndex(0)
    setIsTyping(false)
    setTimeLeft(time)
    stopType()
  }, [stopType, time, currentText, position])

  useEffect(() => {
    if (!currentText) return

    const content = Array.from(currentText).map((letter, index) => {
      let resultColor = ""
      if (index < inpFieldValue.length) {
        resultColor =
          letter === inpFieldValue[index]
            ? "text-green-400"
            : letter === " "
            ? "bg-red-500"
            : "text-red-500"
      }

      return (
        <span
          key={index}
          ref={(element) => {
            inpFieldValue.length === index &&
              (activeLetterRef.current = element || undefined)
          }}
          className={`${
            inpFieldValue.length === index ? CurrentPositionStyle : ""
          } ${resultColor}`}>
          {position === index && <OpponentCursor />}
          {letter}
        </span>
      )
    })

    setTypingText(content)
  }, [inpFieldValue, currentText, position])

  const setInputFocus = () => {
    return inputRef.current?.focus()
  }

  useEffect(() => {
    document.addEventListener("keydown", setInputFocus)

    loadParagraph()

    return () => document.removeEventListener("keydown", setInputFocus)
  }, [loadParagraph])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (timeLeft <= 0 || !isTyping) {
      clearInterval(interval)
      setIsTyping(false)
      stopType()
      return
    }

    interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000)

    return () => clearInterval(interval)
  }, [isTyping, timeLeft, stopType])

  const onTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (inpFieldValue.length > typingText.length || timeLeft < 1) {
      setIsTyping(false)
      inputRef.current?.blur()

      stopType()
      return
    }

    if (!isTyping) {
      setIsTyping(true)
      startType()
    }

    const currentTypingPosition = inpFieldValue.length

    activeLetterRef?.current?.scrollIntoView({ behavior: "smooth" })
    setCharIndex(currentTypingPosition)
    setInpFieldValue(e.target.value)

    sendPosition(currentTypingPosition)
  }

  const sendPosition = async (position: number) => {
    await axios
      .post("/api/game/playing", {
        position: position,
        currentUserId,
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    const channel = pusherClient.subscribe("game")

    channel.bind(
      "opponent-position",
      (opponent: { position: number; userId: string }) => {
        if (!opponent || opponent.userId === currentUserId) return

        setPosition(opponent.position)
      }
    )

    return () => {
      pusherClient.unsubscribe("game")
      pusherClient.unbind("opponent-position")
    }
  }, [setPosition, currentUserId])

  return (
    <>
      <div className="p-0 my-10 min-w-full flex flex-col justify-center items-center bg-[#1E1E1E]">
        <div
          className={`md:max-w-5xl p-5 md:p-7 w-[calc(100% - 10px)] md:rounded-3xl ${
            isTyping ? "bg-[#1E1E1E]" : "bg-neutral-800"
          }  md:shadow-lg`}>
          <div className="flex flex-1 mt-28 md:mt-0" />

          <div className="p-2">
            <input
              ref={inputRef}
              autoComplete="off"
              type="text"
              className="md:-z-10 absolute caret-transparent opacity-10 outline-none text-transparent h-28 border-transparent bg-transparent"
              autoFocus
              value={inpFieldValue}
              tabIndex={-1}
              onChange={onTyping}
            />
            <div className="relative pb-8 text-2xl text-neutral-300 font-mono">
              <div className="whitespace-break-spaces leading-8 h-24 overflow-hidden">
                {typingText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Typing
