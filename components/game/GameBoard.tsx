"use client"

import { ChangeEvent, useEffect, useState } from "react"

import { pusherClient } from "@/libs/pusher"
import useGame from "@/store/useGame"
import axios from "axios"

const GameBoard = () => {
  const { setGameCode, code: gameCode } = useGame()
  const [counterTime, setCounterTime] = useState(0)
  const [position, setPosition] = useState(0)
  const [text, setText] = useState("")

  useEffect(() => {
    const channel = pusherClient.subscribe("game")
    channel.bind("game-starts-in", (counterTime: number) => {
      setCounterTime(Math.max(Math.ceil(counterTime / 1000), 1))
      // const parsedMessage = JSON.parse(data);
      // console.log(parsedMessage);
      // setMessages((prev) => [...prev, parsedMessage]);
      //   console.log(counterTime);
    })

    channel.bind("lets-go", (counterTime: number) => {
      //   console.log("lets-go");
      setCounterTime(counterTime)
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
  }, [gameCode, setGameCode])

  useEffect(() => {
    sendPosition(text.length)
  }, [text])

  const sendPosition = async (position: number) => {
    await axios.post("/api/position", {
      position: position,
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
      {counterTime > 0 && <span>{counterTime}</span>}
      <div className="space-y-3">
        <div className="font-semibold">
          opponent: {position}, my: {text.length}
        </div>

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
