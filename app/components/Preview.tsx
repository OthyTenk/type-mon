"use client"

import { FC, ReactElement } from "react"
import { IoRefresh } from "react-icons/io5"

interface IPreviewProps {
  typingText: string | ReactElement[]
  onTryAgain: () => void
}

const Preview: FC<IPreviewProps> = ({ typingText, onTryAgain }) => {
  return (
    <div className="p-2">
      <div className="pb-8 text-2xl text-neutral-300">
        <div className="leading-8 h-24 overflow-hidden">{typingText}</div>
      </div>

      <div className="flex items-center mt-4 justify-center">
        <button
          onClick={onTryAgain}
          className="p-4 outline-none cursor-pointer m-1 rounded-full hover:bg-neutral-700">
          <IoRefresh size={24} />
        </button>
      </div>
    </div>
  )
}

export default Preview
