"use client"

import useIsTyping from "@/app/hooks/useIsTyping"
import useResultStatistic from "@/app/hooks/useResultStatistic"
import useTypingResultModal from "@/app/hooks/useTypingResultModal"
import axios from "axios"
import Button from "../Button"
import Modal from "./Modal"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

const TypingResultModal = () => {
  const typingResultModal = useTypingResultModal()
  const router = useRouter()

  const { currentUserEmail, mistakes, maxTime, WPM, CPM } = useResultStatistic()
  const { currentLanguage } = useIsTyping()

  const onSaveResult = async () => {
    if (!currentUserEmail) {
      typingResultModal.onClose()
      return
    }

    await axios
      .post(`/api/history/${currentUserEmail}`, {
        time: maxTime,
        mistakes,
        wpm: WPM,
        cpm: CPM,
        language: currentLanguage,
      })
      .then(() => {
        console.log("Saved")
      })
      .finally(() => {
        typingResultModal.onClose()
      })
  }

  const bodyContent = (
    <div>
      {currentUserEmail && (
        <div className="p-6 text-lg font-semibold">{currentUserEmail}</div>
      )}
      <ul className="flex w-full justify-between items-center m-0 md:w-[calc(100% - 120px)] list-none">
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Time Left:</p>
          <span className="text-lg">
            <b>{maxTime}</b>s
          </span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">Mistakes:</p>
          <span className="text-lg">{mistakes}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">WPM:</p>
          <span className="text-lg">{WPM}</span>
        </li>
        <li className="my-0 mx-3">
          <p className="m-1 text-xs">CPM:</p>
          <span className="text-lg">{CPM}</span>
        </li>
      </ul>
    </div>
  )

  const handleButtonClick = useCallback(() => {
    typingResultModal.onClose()
    router.push("/auth/login")
  }, [typingResultModal, router])

  const footerContent = (
    <div className="mt-6 flex flex-col">
      <hr />
      <p className="mt-8 flex justify-center font-light">
        If you log in this site. You can save your typing result.
      </p>
      <div className="mt-4 font-semibold text-lg">
        <Button
          label=" Login or register your account"
          outline
          onClick={handleButtonClick}
        />
      </div>
    </div>
  )

  return (
    <Modal
      title="Typing result"
      actionLabel="OK"
      onSubmit={onSaveResult}
      onClose={onSaveResult}
      isOpen={typingResultModal.isOpen}
      body={bodyContent}
      footer={currentUserEmail ? <></> : footerContent}
    />
  )
}

export default TypingResultModal
