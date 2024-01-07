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

import Cursor from "@/app/components/Cursor"
import TimeTick from "@/app/components/TimeTick"
import { IResultStatisticStore } from "@/app/hooks/useResultStatistic"
import { countCorrectCharacters } from "@/app/utils"
import { pusherClient } from "@/libs/pusher"
import useGame from "@/store/useGame"
import useGameResult from "@/store/useGameResult"
import useGameResultModal from "@/store/useGameResultModal"
import axios from "axios"

interface ITypingProps {
  currentText: string
  currentUserId: string
}

const Typing: FC<ITypingProps> = ({ currentText, currentUserId }) => {
  const { stopType, isTyping } = useGlobal()

  const inputRef = useRef<HTMLInputElement>(null)
  const activeLetterRef = useRef<HTMLSpanElement>()
  const opponentLetterRef = useRef<HTMLSpanElement>()

  // const [position, setPosition] = useState(0)
  const [tickTime, setTickTime] = useState(0)
  const [gameFinish, setGameFinish] = useState(false)
  const {
    creator,
    guest,
    setGuest,
    setCreator,
    reset: resetGameResult,
  } = useGameResult()
  const gameResultModal = useGameResultModal()
  const { code: gameCode, reset } = useGame()

  const [typingText, setTypingText] = useState<string | ReactElement[]>("")
  const [inpFieldValue, setInpFieldValue] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  const loadParagraph = useCallback(() => {
    const content = Array.from(currentText).map((letter, index) => (
      <span
        key={index}
        ref={(element) => {
          if (index === 0) {
            activeLetterRef.current = element || undefined
            opponentLetterRef.current = element || undefined
          }
        }}>
        {letter}
      </span>
    ))

    setTypingText(content)
    setInpFieldValue("")
    setCharIndex(0)
  }, [currentText])

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
          className={`${resultColor}`}>
          {letter}
        </span>
      )
    })

    if (inpFieldValue.length >= currentText.length) {
      stopType()
      inputRef.current?.blur()
    }

    setTypingText(content)
  }, [inpFieldValue, currentText, stopType])

  const setInputFocus = () => {
    return inputRef.current?.focus()
  }

  useEffect(() => {
    document.addEventListener("keydown", setInputFocus)

    loadParagraph()

    return () => document.removeEventListener("keydown", setInputFocus)
  }, [loadParagraph])

  useEffect(() => {
    let cpm = (charIndex - creator.mistakes) * (60 / tickTime)
    cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm
    creator.CPM = Math.round(cpm)

    let wpm = Math.round(((charIndex - creator.mistakes) / 5 / tickTime) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    creator.WPM = wpm
  }, [tickTime, charIndex, creator])

  const onTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (tickTime === 0 || gameFinish) {
      return
    }
    setInpFieldValue(e.target.value)

    if (inpFieldValue.length > typingText.length - 1) {
      setGameFinish(true)
      onFinishedGame()
      gameResultModal.onOpen()
      return
    }

    const currentTypingPosition = inpFieldValue.length

    activeLetterRef?.current?.scrollIntoView({ behavior: "smooth" })
    setCharIndex(currentTypingPosition)
    onSendActiveCharPosition(currentTypingPosition)
    creator.mistakes = countCorrectCharacters(currentText, inpFieldValue)
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

  const onFinishedGame = useCallback(async () => {
    const newCreator = {
      ...creator,
      currentUserEmail: currentUserId,
      time: tickTime,
    }
    setCreator(newCreator)

    await axios
      .post("/api/game/finish", {
        result: newCreator,
        gameCode,
      })
      .catch((err) => {
        console.error(err)
      })
  }, [gameCode, creator, setCreator, currentUserId, tickTime])

  useEffect(() => {
    if (!gameCode) return

    const channel = pusherClient.subscribe(gameCode)

    const opponentDisconnected = (data: { gameCode: string }) => {
      if (gameCode === data.gameCode) {
        reset()
        stopType()
        resetGameResult()

        if (gameResultModal.isOpen) {
          gameResultModal.onClose()
        }
      }
    }

    const opponentPosition = (data: { position: number; userId: string }) => {
      if (!data || data.userId === currentUserId) {
        return
      }

      // setPosition(data.position)
      Array.from(currentText).map((letter, index) => {
        return (
          <span
            key={index}
            ref={(element) => {
              data.position === index &&
                (opponentLetterRef.current = element || undefined)
            }}
          />
        )
      })
    }

    const gameFinish = (data: IResultStatisticStore) => {
      if (data.currentUserEmail === currentUserId) {
        return
      }

      stopType()
      setGameFinish(true)

      if (!guest.currentUserEmail) {
        setGuest(data)
      }

      if (!creator.currentUserEmail && !gameResultModal.isOpen) {
        onFinishedGame()
      }

      if (!gameResultModal.isOpen) {
        gameResultModal.onOpen()
      }
    }

    channel.bind("opponent-position", opponentPosition)
    channel.bind("opponent-disconnected", opponentDisconnected)
    channel.bind("game-finish", gameFinish)

    return () => {
      if (gameCode) {
        pusherClient.unsubscribe(gameCode)
        pusherClient.unbind("opponent-position")
        pusherClient.unbind("game-finish")
      }
    }
  }, [
    setCreator,
    tickTime,
    currentUserId,
    gameCode,
    reset,
    stopType,
    gameResultModal,
    creator,
    guest,
    setGuest,
    onFinishedGame,
    resetGameResult,
    currentText,
  ])

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
              {/* Creator */}
              <Cursor activeLetterRef={activeLetterRef} />

              {/* Opponent */}
              <Cursor activeLetterRef={opponentLetterRef} isOpponent={true} />

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
