"use client"

import useTypingResultModal from "@/app/hooks/useTypingResultModal"
import React from "react"
import Modal from "./Modal"
import useResultStatistic from "@/app/hooks/useResultStatistic"

const TypingResultModal = () => {
  const typingResultModal = useTypingResultModal()
  const resultStatistic = useResultStatistic()

  const bodyContent = (
    <div>
      <ul className="flex w-full justify-between items-center m-0 md:w-[calc(100% - 120px)] list-none">
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Time Left:</p>
          <span className="text-lg">
            <b>{resultStatistic.maxTime}</b>s
          </span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Mistakes:</p>
          <span className="text-lg">{resultStatistic.mistakes}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">WPM:</p>
          <span className="text-lg">{resultStatistic.WPM}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">CPM:</p>
          <span className="text-lg">{resultStatistic.CPM}</span>
        </li>
      </ul>
    </div>
  )

  return (
    <Modal
      title="Typing result"
      actionLabel="OK"
      onSubmit={typingResultModal.onClose}
      onClose={typingResultModal.onClose}
      isOpen={typingResultModal.isOpen}
      body={bodyContent}
    />
  )
}

export default TypingResultModal
