"use client"

import { ChangeEvent, useEffect, useState } from "react"

import { pusherClient } from "@/libs/pusher"
import useGame from "@/store/useGame"
import { Player, StartGame } from "@/types"
import axios from "axios"

const GameBoard = () => {
  const { setGameCode, code: gameCode } = useGame()
  const [startTime, setStartTime] = useState(0)
  const [showCounter, setShowCounter] = useState(0)
  const [position, setPosition] = useState(0)
  const [text, setText] = useState("")
  const { currentUserId } = useGame()
  const [player, setPlayer] = useState<Player>()
  const [sentence, setSentence] = useState("")

  useEffect(() => {
    const channel = pusherClient.subscribe("game")
    channel.bind("game-starts-in", (startGame: StartGame) => {
      // setCounterTime(Math.max(Math.ceil(counterTime / 1000), 1))
      if (!startGame) return

      const { startTime, players, sentence } = startGame

      setStartTime(startTime)
      setPlayer(
        players.creator.id === currentUserId ? players.guest : players.creator
      )
      setSentence(sentence)
      // startGame.players
      // const parsedMessage = JSON.parse(data);
      // console.log(parsedMessage);
      // setMessages((prev) => [...prev, parsedMessage]);
      //   console.log(counterTime);
    })

    channel.bind("lets-go", (counterTime: number) => {
      //   console.log("lets-go");
      // setCounterTime(counterTime)
    })

    channel.bind("opponent-position", (opponent: { position: number }) => {
      if (!opponent) return

      setPosition(opponent.position)
    })

    return () => {
      pusherClient.unsubscribe("game")
      pusherClient.unbind("game-starts-in")
      pusherClient.unbind("lets-go")
      pusherClient.unbind("opponent-position")
    }
  }, [
    gameCode,
    setGameCode,
    setSentence,
    setPlayer,
    setStartTime,
    setPosition,
    currentUserId,
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (startTime <= 0) {
      clearInterval(interval)
      return
    }

    interval = setInterval(() => {
      const remaining = startTime - new Date().getTime()
      if (remaining > 0) {
        setShowCounter(Math.max(Math.ceil(remaining / 1000), 1))
      } else {
        setShowCounter(0)
        setStartTime(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  useEffect(() => {
    sendPosition(text.length)
  }, [text])

  const sendPosition = async (position: number) => {
    await axios
      .post("/api/game/playing", {
        position: position,
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const onTypePosition = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const onReset = () => {
    setPosition(0)
    setText("")
  }

  return (
    <div>
      {showCounter > 0 && <span>{showCounter}</span>}
      <div className="space-y-3">
        <div className="font-semibold">
          opponent: {position}, my: {text.length}
        </div>

        <div className="font-semibold">Player: {player?.name}</div>

        <div>{sentence}</div>

        <div className="space-x-3">
          <input
            type="text"
            value={text}
            className="outline outline-neutral-400 rounded-xl w-96"
            onChange={onTypePosition}
          />
          <button onClick={onReset}>reset</button>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
