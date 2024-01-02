"use client"

import { FC, MutableRefObject } from "react"

// <div className="mb-5">
//   <h6 className="py-2">Average Typing Speeds</h6>
//   <div className="d-flex text-white meter-gauge">
//     <span className="col" style={{ background: "#eb4841" }}>
//       0 - 20 Slow
//     </span>
//     <span className="col" style={{ background: "#f48847" }}>
//       20 - 40 Average
//     </span>
//     <span className="col" style={{ background: "#ffc84a" }}>
//       40 - 60 Fast
//     </span>
//     <span className="col" style={{ background: "#a6c34c" }}>
//       60 - 80 Professional
//     </span>
//     <span className="col" style={{ background: "#4ec04e" }}>
//       80 - 100+ Top
//     </span>
//   </div>
// </div>

interface CursorProps {
  activeLetterRef: MutableRefObject<HTMLSpanElement | undefined>
}

const Cursor: FC<CursorProps> = ({ activeLetterRef }) => {
  if (!activeLetterRef || !activeLetterRef.current) return null

  const {
    offsetTop,
    clientHeight,
    offsetLeft: cursorLeft,
  } = activeLetterRef.current

  const diff = Math.max(offsetTop - clientHeight, 0)
  const cursorTop = offsetTop - diff

  return (
    <div
      style={{ left: cursorLeft, top: cursorTop }}
      className="absolute border-l-[2px] h-8 border-orange-500"
      //   style={{ transform: `translate(${cursorLeft}, ${cursorTop})` }}
      //   className="fixed w-[3px] transition h-8 bg-orange-500 text-white"
    >
      <div className="w-[10px] h-[10px] bg-orange-500 -mt-[6px] -ml-[6px] rounded-full" />
    </div>
  )
}

export default Cursor
