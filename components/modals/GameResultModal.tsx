"use client"

import Modal from "@/components/modals/Modal"
import useGame from "@/store/useGame"
import useGameResult from "@/store/useGameResult"
import useGameResultModal from "@/store/useGameResultModal"
import { FaRegThumbsDown } from "react-icons/fa"
import { GiPodiumWinner } from "react-icons/gi"

const GameResultModal = () => {
  const gameResultModal = useGameResultModal()
  const { creator, guest } = useGameResult()
  const { currentUserId } = useGame()

  const onSaveResult = async () => {
    gameResultModal.onClose()
  }

  const bodyContent = (
    <div className="space-y-2">
      <div className="mt-4 flex justify-center font-semibold text-3xl py-4 uppercase">
        {creator.WPM > guest.WPM ? (
          <div className="flex gap-3">
            <GiPodiumWinner size={32} />
            You won
          </div>
        ) : (
          <div className="flex gap-3">
            <FaRegThumbsDown size={32} />
            You lost
          </div>
        )}
      </div>

      {creator.currentUserEmail && (
        <div className="py-6 text-lg font-semibold">
          {creator.currentUserEmail === currentUserId
            ? "You"
            : creator.currentUserEmail}
        </div>
      )}
      <ul className="flex w-full justify-between items-center m-0 md:w-[calc(100% - 120px)] list-none">
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Time Left:</p>
          <span className="text-lg">
            <b>{creator.time}</b>s
          </span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Mistakes:</p>
          <span className="text-lg">{creator.mistakes}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">WPM:</p>
          <span className="text-lg">{creator.WPM}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">CPM:</p>
          <span className="text-lg">{creator.CPM}</span>
        </li>
      </ul>

      {guest.currentUserEmail && (
        <div className="py-6 text-lg font-semibold">
          {guest.currentUserEmail}
        </div>
      )}
      <ul className="flex w-full justify-between items-center m-0 md:w-[calc(100% - 120px)] list-none">
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Time Left:</p>
          <span className="text-lg">
            <b>{guest.time}</b>s
          </span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Mistakes:</p>
          <span className="text-lg">{guest.mistakes}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">WPM:</p>
          <span className="text-lg">{guest.WPM}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">CPM:</p>
          <span className="text-lg">{guest.CPM}</span>
        </li>
      </ul>
    </div>
  )

  return (
    <Modal
      title="Type result"
      actionLabel="OK"
      onSubmit={onSaveResult}
      onClose={onSaveResult}
      isOpen={gameResultModal.isOpen}
      body={bodyContent}
    />
  )
}

export default GameResultModal
