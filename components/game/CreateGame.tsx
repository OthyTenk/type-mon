"use client"

import useGame from "@/store/useGame"
import axios from "axios"
import { useState } from "react"
import WaitingBoard from "./WaitingBoard"

const CreateGame = () => {
  const [codeLoading, setCodeLoading] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [gameCode, setGameCode] = useState("")
  const { currentUser, currentUserId, creatorCode, setGameCreatorCode } =
    useGame()

  const onCreateGame = async () => {
    setCodeLoading(true)

    setGameCode("")
    setCodeError(false)

    await axios
      .post("/api/game/create", {
        userId: currentUserId,
      })
      .then((res) => {
        setGameCreatorCode(res.data.gameCode)
      })
      .finally(() => {
        setCodeLoading(false)
      })
  }

  const onJoinGame = async () => {
    setCodeLoading(true)

    await axios
      .post("/api/game/join", {
        userId: currentUserId,
        inputCode: gameCode,
      })
      .then((res) => {
        setGameCreatorCode("")
      })
      .catch((res) => {
        setCodeError(true)
      })
      .finally(() => {
        setCodeLoading(false)
      })
  }

  return (
    <div>
      {creatorCode.length > 0 ? (
        <WaitingBoard gameCode={creatorCode} userName={currentUser || ""} />
      ) : (
        <div className="flex flex-col w-full md:flex-row items-center justify-between gap-2">
          <div className="border flex flex-1 flex-col h-36 w-full space-y-2 border-orange-100 p-4 rounded-xl">
            <h2 className="text-xl font-semibold">Create</h2>

            {/* <div className="flex gap-2">
              <h3 className="">Qoute Length:</h3>
              <div className="">
                <button
                  onClick={() => {
                    // setQuoteLength("short");
                  }}>
                  short
                </button>
              </div>
            </div> */}

            <button
              className="py-2 px-4 h-[41px] text-white bg-yellow-600/60 rounded-lg hover:shadow-lg"
              disabled={codeLoading}
              onClick={onCreateGame}>
              Create Game
            </button>
          </div>

          <div className="text-center m-2">or</div>

          <div className="border border-orange-100 flex flex-1 flex-col w-full px-4 py-5 rounded-xl">
            <h2 className="text-xl font-semibold">Join</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onJoinGame()
              }}>
              <div className="py-4 flex flex-row gap-2 items-center">
                <input
                  value={gameCode}
                  className="p-2 bg-neutral-700 rounded-lg outline-amber-600"
                  onChange={(e) => {
                    if (e.target.value.length > 4) return

                    setGameCode(e.target.value.toUpperCase())
                    setCodeError(false)
                  }}
                  placeholder="Enter code..."
                />
                <span className="">{gameCode.length}/4</span>
                {!codeLoading && (
                  <button
                    className=" px-4 h-[41px] w-32 text-white disabled:bg-neutral-700 bg-yellow-600/60 rounded-lg hover:shadow-lg"
                    onClick={onJoinGame}
                    disabled={gameCode.length !== 4}>
                    Join Game
                  </button>
                )}
              </div>
              {codeError && (
                <span className=" text-rose-500">Invalid code</span>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateGame
