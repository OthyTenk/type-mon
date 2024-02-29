"use client"

import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

// const deleted = "⌫"

const LatinTop = [
  "tab ↹",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "\\",
]
const LatinHome = [
  "capslock ⇪",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "enter ⏎",
]

const LatinFooter = [
  "shift ⇧",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "⇧ shift",
]

const LatinBottom = [
  "ctrl",
  "win",
  "alt",
  "space",
  "alt",
  "win",
  "menu",
  "ctrl",
]

const Demo = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const activeLetter = useRef<HTMLDivElement>(null)
  const [typingText, setTypingText] = useState<string | ReactElement[]>("")
  const [typingRow, setTypingRow] = useState<ReactElement[]>([])
  const [inpFieldValue, setInpFieldValue] = useState("")
  const CurrentPositionStyle =
    "border-b-2 border-orange-600 animate-pulse duration-75 bg-neutral-600"

  const textJF = "jjjfjjjfjjjfjjjf"
  const textFJ = "fffjfffjfffjfffj"
  const textSpaceJ = " j j j j j j j"
  const textSpaceFJ = "jjj ffffff jjjff jj ff"

  const currentText = textJF

  const setInputFocus = () => inputRef.current?.focus()

  useEffect(() => {
    document.addEventListener("keydown", () => setInputFocus)

    return () => document.removeEventListener("keydown", setInputFocus)
  }, [])

  const latinHomeRow = useCallback(
    (focusNextLetter: string) => {
      let clickedLetterIndex = inpFieldValue.length - 1
      let clickedLetter = inpFieldValue[clickedLetterIndex]
      let currentLetter = currentText[clickedLetterIndex]

      // set focus next letter
      const rowLayout = LatinHome.map((key, index) => {
        return (
          <button
            className={`${
              key.length > 2
                ? key.startsWith("caps")
                  ? "w-28 text-sm text-left"
                  : "w-[80px] text-sm text-right"
                : "w-11 uppercase"
            } h-11 ${
              clickedLetter === key
                ? clickedLetter === currentLetter
                  ? "bg-green-500"
                  : "bg-rose-500"
                : "bg-neutral-600"
            } ${
              focusNextLetter === key ? "outline outline-orange-600" : ""
            } transition-color rounded-md shadow-lg p-2`}
            key={`${key}-${index}`}>
            {key === "f" || key === "j" ? (
              <span className="border-b pb-[3px]">{key}</span>
            ) : (
              key
            )}
          </button>
        )
      })

      setTypingRow(rowLayout)
    },

    [inpFieldValue, currentText]
  )

  useEffect(() => {
    if (!currentText) return

    let focusNextLetter = ""
    const content = Array.from(currentText).map((letter, index) => {
      if (currentText.length > inpFieldValue.length) {
        focusNextLetter = currentText[inpFieldValue.length]
      }

      let resultColor = ""
      if (index < inpFieldValue.length) {
        resultColor =
          letter === inpFieldValue[index]
            ? "text-green-400"
            : letter === " "
            ? "bg-red-500"
            : "text-red-500"
      }

      return (
        <div
          key={index}
          ref={inpFieldValue.length === index ? activeLetter : null}
          className={`w-[46px] h-[46px] flex items-center justify-center border-neutral-600 border rounded-lg ${
            inpFieldValue.length === index ? CurrentPositionStyle : ""
          }  ${resultColor}`}>
          {letter}
        </div>
      )
    })

    latinHomeRow(focusNextLetter)

    setTypingText(content)
  }, [inpFieldValue, currentText, latinHomeRow])

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (inpFieldValue.length > typingText.length) {
      return
    }

    setInpFieldValue(e.target.value)
  }

  return (
    <div className=" max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div>
        <input ref={inputRef} autoFocus type="text" onChange={handleTyping} />
        <div className="pb-8 text-2xl gap-1 flex text-neutral-300 font-mono">
          {typingText}
        </div>
      </div>

      <div className="space-y-2 flex flex-col border bg-neutral-800 p-4 w-fit rounded-xl">
        <div className="space-x-2">
          {LatinTop.map((key, index) => {
            return (
              <button
                className={` ${
                  key.startsWith("tab")
                    ? "w-24 text-sm text-left"
                    : "w-11 uppercase"
                } h-11 ${
                  activeLetter.current?.innerText === key
                    ? "bg-orange-500"
                    : "bg-neutral-600"
                }  rounded-md shadow-lg p-2`}
                key={`${key}-${index}`}>
                {key}
              </button>
            )
          })}
        </div>

        <div className="space-x-2">{typingRow}</div>

        <div className="space-x-2">
          {LatinFooter.map((key, index) => {
            return (
              <button
                className={` ${
                  key.length > 2
                    ? key === "shift ⇧"
                      ? "w-[134px] text-sm text-left"
                      : "w-[110px] text-sm text-right"
                    : "w-11 uppercase"
                } h-11 bg-neutral-600 rounded-md shadow-lg p-2`}
                key={`${key}-${index}`}>
                {key}
              </button>
            )
          })}
        </div>
        <div className="space-x-2">
          {LatinBottom.map((key, index) => {
            return (
              <button
                className={`${
                  key === "space" ? "w-[296px]" : "w-[60px]"
                } h-11 bg-neutral-600 rounded-md shadow-lg text-sm`}
                key={`${key}-${index}`}>
                {key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Demo
