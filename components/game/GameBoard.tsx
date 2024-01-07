"use client"

import { useEffect, useState } from "react"

import { pusherClient } from "@/libs/pusher"
import useGame from "@/store/useGame"
import useGlobal from "@/store/useGlobal"
import { Player, StartGame } from "@/types"
import Typing from "./Typing"

const GameBoard = () => {
  const { code: gameCode, currentUserId } = useGame()
  const { startType } = useGlobal()

  const [startTime, setStartTime] = useState(0)
  const [showCounter, setShowCounter] = useState<number | undefined>(undefined)

  const [player, setPlayer] = useState<Player>()
  const [sentence, setSentence] = useState("")

  useEffect(() => {
    if (!gameCode) return

    const channel = pusherClient.subscribe(gameCode)
    channel.bind("game-starts-in", (startGame: StartGame) => {
      if (!startGame) return

      const { startTime, creator, guest, sentence } = startGame
      setStartTime(startTime)

      const opponent = creator.id === currentUserId ? guest : creator
      setPlayer(opponent)
      setSentence(sentence)
    })

    return () => {
      if (gameCode) {
        pusherClient.unsubscribe(gameCode)
        pusherClient.unbind("game-starts-in")
      }
    }
  }, [gameCode, setSentence, setPlayer, setStartTime, currentUserId])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    interval = setInterval(() => {
      const remaining = startTime - new Date().getTime()
      if (remaining > 0) {
        setShowCounter(Math.max(Math.ceil(remaining / 1000), 1))
      } else {
        setShowCounter(0)
        setStartTime(0)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  useEffect(() => {
    showCounter === 0 && startType()
  }, [showCounter, startType])

  const renderedCountDown = () => {
    return showCounter && showCounter > 0 ? (
      <span>{showCounter}</span>
    ) : (
      <span>{showCounter === 0 ? "GO!" : "A wait!"}</span>
    )
  }

  return (
    <div>
      <div className="space-y-3">
        <div className="font-semibold px-2">
          Player: <span className=" text-orange-500">{player?.name}</span>
        </div>

        {renderedCountDown()}

        <Typing currentText={sentence} currentUserId={currentUserId} />
      </div>
    </div>
  )
}

export default GameBoard
