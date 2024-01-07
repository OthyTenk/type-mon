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

import TimeTick from "@/app/components/TimeTick"
import useResultStatistic, {
  IResultStatisticStore,
} from "@/app/hooks/useResultStatistic"
import useTypingResultModal from "@/app/hooks/useTypingResultModal"
import { countCorrectCharacters } from "@/app/utils"
import { pusherClient } from "@/libs/pusher"
import useGame from "@/store/useGame"
import axios from "axios"
import OpponentCursor from "./OpponentCursor"

interface ITypingProps {
  currentText: string
  currentUserId: string
}

const Typing: FC<ITypingProps> = ({ currentText, currentUserId }) => {
  const { stopType, isTyping } = useGlobal()

  const inputRef = useRef<HTMLInputElement>(null)
  const activeLetterRef = useRef<HTMLSpanElement>()
  const [position, setPosition] = useState(0)
  const [tickTime, setTickTime] = useState(0)
  const [gameFinish, setGameFinish] = useState(false)
  const stat = useResultStatistic()
  const typingResultModal = useTypingResultModal()
  const { code: gameCode, reset } = useGame()

  const CurrentPositionStyle = "border-l-2 border-yellow-400 animate-pulse"

  const [typingText, setTypingText] = useState<string | ReactElement[]>("")
  const [inpFieldValue, setInpFieldValue] = useState("")
  const [charIndex, setCharIndex] = useState(0)

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
  }, [currentText, position])

  useEffect(() => {
    if (!currentText || inpFieldValue.length > currentText.length) {
      stopType()
      return
    }

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

    if (inpFieldValue.length >= currentText.length) {
      stopType()
      inputRef.current?.blur()
    }

    setTypingText(content)
  }, [inpFieldValue, currentText, position, stopType])

  const setInputFocus = () => {
    return inputRef.current?.focus()
  }

  useEffect(() => {
    document.addEventListener("keydown", setInputFocus)

    loadParagraph()

    return () => document.removeEventListener("keydown", setInputFocus)
  }, [loadParagraph])

  useEffect(() => {
    let cpm = (charIndex - stat.mistakes) * (60 / tickTime)
    cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm
    stat.CPM = Math.round(cpm)

    let wpm = Math.round(((charIndex - stat.mistakes) / 5 / tickTime) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    stat.WPM = wpm
  }, [tickTime, charIndex, stat])

  const onTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (tickTime === 0 || gameFinish) {
      return
    }
    setInpFieldValue(e.target.value)

    if (inpFieldValue.length > typingText.length - 1) {
      stat.currentUserEmail = currentUserId
      setGameFinish(true)
      onFinishedGame()
      typingResultModal.onOpen()
      return
    }

    const currentTypingPosition = inpFieldValue.length

    activeLetterRef?.current?.scrollIntoView({ behavior: "smooth" })
    setCharIndex(currentTypingPosition)
    onSendActiveCharPosition(currentTypingPosition)
    stat.mistakes = countCorrectCharacters(currentText, inpFieldValue)
  }

  const onSendActiveCharPosition = async (position: number) => {
    await axios
      .post("/api/game/playing", {
        position: position + 1,
        currentUserId,
        gameCode,
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onFinishedGame = async () => {
    const result: IResultStatisticStore = {
      WPM: stat.WPM,
      CPM: stat.CPM,
      currentUserEmail: stat.currentUserEmail,
      time: tickTime,
      mistakes: stat.mistakes,
    }

    await axios
      .post("/api/game/finish", {
        result,
        gameCode,
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (!gameCode) return

    const channel = pusherClient.subscribe(gameCode)

    const opponentDisconnected = (data: { gameCode: string }) => {
      if (gameCode === data.gameCode) {
        reset()
        stopType()

        if (typingResultModal.isOpen) {
          typingResultModal.onClose()
        }
      }
    }

    const opponentPosition = (data: { position: number; userId: string }) => {
      if (!data || data.userId === currentUserId) return

      setPosition(data.position)
    }

    const gameFinish = (data: IResultStatisticStore) => {
      console.log(data)
      stopType()
      setGameFinish(true)
    }

    channel.bind("opponent-position", opponentPosition)
    channel.bind("opponent-disconnected", opponentDisconnected)

    channel.bind("game-finish", gameFinish)

    return () => {
      if (gameCode) {
        pusherClient.unsubscribe(gameCode)
        pusherClient.unbind("opponent-position")
      }
    }
  }, [setPosition, currentUserId, gameCode, reset, stopType, typingResultModal])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (isTyping) {
      interval = setInterval(() => {
        setTickTime((priv) => priv + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isTyping])

  return (
    <>
      <div className="p-0 my-10 min-w-full flex flex-col justify-center items-center bg-[#1E1E1E]">
        <div
          className={`md:max-w-5xl p-5 md:p-7 w-[calc(100% - 10px)] md:rounded-3xl ${
            isTyping ? "bg-[#1E1E1E]" : "bg-neutral-800"
          }  md:shadow-lg`}>
          <div className="flex flex-1 mt-28 md:mt-0" />

          <TimeTick timeLeft={tickTime} />
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
