"use client"

import useTypingResultModal from "@/app/hooks/useTypingResultModal"
import React from "react"
import Modal from "./Modal"

const TypingResultModal = () => {
  const typingResultModal = useTypingResultModal()

  const bodyContent = <div>body content</div>

  return (
    <Modal
      title="Resuklt"
      actionLabel="Ok"
      onSubmit={() => {}}
      onClose={typingResultModal.onClose}
      isOpen={typingResultModal.isOpen}
      body={bodyContent}
    />
  )
}

export default TypingResultModal
