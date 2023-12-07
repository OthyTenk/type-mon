"use client"

import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { IoRefresh } from "react-icons/io5"
import useTypingResultModal from "../hooks/useTypingResultModal"
import { countCorrectCharacters } from "../utils"
// import Preview from "./Preview"
import useResultStatistic from "../hooks/useResultStatistic"
import TimeTick from "./TimeTick"
import useIsTyping from "../hooks/useIsTyping"

const Typing = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const activeLetter = useRef<HTMLSpanElement>(null)
  const paragraphs = useMemo(
    () => [
      "Эрт урьд цагт нэгэн тосгонд энэ дэлхийд хосгүй хөөрхөн бяцхан охин байдаг санжээ. Эх нь охиндоо ухаан жолоогүй хайртай. Эмэг эх нь ээжээсээ нь ч илүү хайртай юм гэнэ. Эмэг эх нь нэгэнтээ ач охиндоо, зохисон гэдэг нь жигтэйхэн, хөөрхөн улаан малгай хийж өгчээ. Охин хаашаа ч явсан түүнийг өмсдөг болохоор хавь ойрынхон нь охиныг “Улаан малгайт” гэж нэрлэдэг байжээ.",
      "Нэг өдөр эх нь амтат хуушуур хийгээд охиндоо: Эмээгээ эргэж тойроод, энэ хуушуур, савтай тос хоёрыг аваачиж өгөөд ир гэж хэлжээ. Улаан малгайт хуушуур, савтай тос хоёрыг аваад эмээгийнхээ суудаг тосгон руу явжээ. Охиныг ой дундуур явж байтал нэг чоно тааралдаж гэнэ. Өлсгөлөн чоно охиныг идэх гэж арааных нь шүлс гооживч түлээчний мод цавчих сүхний дуунаас айгаад идэх зүрх хүрэхгүй байлаа. Чоно охинд дөхөж очоод:",
      "A plant is one of the most important living things that develop on the earth and is made up of stems, leaves, roots, and so on.Parts of Plants: The part of the plant that developed beneath the soil is referred to as root and the part that grows outside of the soil is known as shoot. The shoot consists of stems, branches, l eaves, fruits, and flowers. Plants are made up of six main parts: roots, stems, leaves, flowers, fruits, and seeds.",
      "The root is the part of the plant that grows in the soil. The primary root emerges from the embryo. Its primary function is to provide the plant stability in the earth and make other mineral salts from the earth available to the plant for various metabolic processes There are three types of roots i.e. Tap Root, Adventitious Roots, and Lateral Root. The roots arise from the parts of the plant and not from the rhizomes roots.",
      "Stem is the posterior part that remains above the ground and grows negatively geotropic. Internodes and nodes are found on the stem. Branch, bud, leaf, petiole, flower, and inflorescence on a node are all those parts of the plant that remain above the ground and undergo negative subsoil development. The trees have brown bark and the young and newly developed stems are green. The roots arise from the parts of plant and not from the rhizomes roots.",
      "It is the blossom of a plant. A flower is the part of a plant that produces seeds, which eventually become other flowers. They are the reproductive system of a plant. Most flowers consist of 04 main parts that are sepals, petals, stamens, and carpels. The female portion of the flower is the carpels. The majority of flowers are hermaphrodites, meaning they have both male and female components. Others may consist of one of two parts and may be male or female.",
      "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
      "life investigation development Los start Germany unit among budget reported bid commercial without executive return chairman international might manager create options compared security PC added pressure every shows three South wants declined well America want so book during image Court how included World approach due profits under released previous recent screen It's go program operating only short such month become another share Last may drives",
      "June still almost provides but didn't director against LAN Most effort vendors plan cannot sources earlier house also if any I different French based long lead financial user there yesterday gave specific rules most once conditions tools Wednesday Now free she something public potential up operation just Calif federal countries country What change network Service means today Even This P management There August Japan revenue October Democratic really",
      "proposal scheduled services numbers N killed type show one this too drive held recently field Mr. rise department interest expected city on them Manager York further showed made personal annual He officials industrial machine come administration They own San hard view features S processing office By filed State In growing Federal expect lost growth when old already period involved ended energy cash release needed support they reports As Street securities",
      "claims hold Union state position With standards storage series And last year became developed U process information kind sold though issue technology war decided New requires files probably early makes death processor bonds work few priced troops So working real air business offer known Party leaders contract First One have give J our Microsoft must job OS top Japanese see name printer told similar then To complex text functions selling disk saying stocks",
      "whether number present Other Although plant had main using where let his rose rather analyst military ever going proposed like likely interface often course won't runs memory",
    ],
    []
  )
  const typingResultModal = useTypingResultModal()
  const CurrentPositionStyle = "border-l-2 border-yellow-400 animate-pulse"
  const stat = useResultStatistic()

  const [typingText, setTypingText] = useState<string | ReactElement[]>("")
  const [inpFieldValue, setInpFieldValue] = useState("")
  const [timeLeft, setTimeLeft] = useState(stat.maxTime)
  const [charIndex, setCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const { stopType, startType } = useIsTyping()

  const loadParagraph = useCallback(() => {
    const ranIndex = Math.floor(Math.random() * paragraphs.length)
    setCurrentTextIndex(ranIndex)
    document.addEventListener("keydown", () => inputRef.current?.focus())

    const content = Array.from(paragraphs[ranIndex]).map((letter, index) => (
      <span
        key={index}
        ref={index === 0 ? activeLetter : null}
        className={`leading-8 ${index === 0 ? CurrentPositionStyle : ""}`}>
        {letter}
      </span>
    ))

    setTypingText(content)
    setInpFieldValue("")
    setCharIndex(0)
    setIsTyping(false)
    setTimeLeft(stat.maxTime)
    stopType()
    stat.setValues
  }, [paragraphs, stat, stopType])

  useEffect(() => {
    const content = Array.from(paragraphs[currentTextIndex]).map(
      (letter, index) => {
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
          <span
            key={index}
            ref={inpFieldValue.length === index ? activeLetter : null}
            className={`${
              inpFieldValue.length === index ? CurrentPositionStyle : ""
            } ${resultColor}`}>
            {letter}
          </span>
        )
      }
    )

    setTypingText(content)
  }, [inpFieldValue, paragraphs, currentTextIndex])

  useEffect(() => loadParagraph(), [loadParagraph])

  useEffect(() => {
    let cpm = (charIndex - stat.mistakes) * (60 / (stat.maxTime - timeLeft))
    cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm
    stat.CPM = Math.round(cpm)

    let wpm = Math.round(
      ((charIndex - stat.mistakes) / 5 / (stat.maxTime - timeLeft)) * 60
    )
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
    stat.WPM = wpm
  }, [timeLeft, charIndex, stat])

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (timeLeft <= 0 || !isTyping) {
      clearInterval(interval)
      setIsTyping(false)
      stopType()
      return
    }

    interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000)

    return () => clearInterval(interval)
  }, [isTyping, timeLeft, stopType])

  const onTryAgain = () => {
    loadParagraph()

    setInterval(
      () => activeLetter?.current?.scrollIntoView({ behavior: "smooth" }),
      500
    )
  }

  const onTyping = (e: ChangeEvent<HTMLInputElement>) => {
    if (inpFieldValue.length > typingText.length || timeLeft < 1) {
      setIsTyping(false)
      inputRef.current?.blur()
      stopType()
      typingResultModal.onOpen()
      return
    }

    if (!isTyping) {
      setIsTyping(true)
      startType()
    }
    activeLetter?.current?.scrollIntoView({ behavior: "smooth" })

    setCharIndex(inpFieldValue.length)

    const temp = countCorrectCharacters(
      paragraphs[currentTextIndex],
      inpFieldValue
    )

    stat.mistakes = temp
    setInpFieldValue(e.target.value)
  }

  return (
    <>
      <div className="p-0 my-10 min-w-full flex flex-col justify-center items-center bg-[#1E1E1E]">
        <div
          className={`md:max-w-5xl p-5 md:p-7 w-[calc(100% - 10px)] md:rounded-3xl ${
            isTyping ? "bg-[#1E1E1E]" : "bg-neutral-800"
          }  md:shadow-md flex flex-col flex-1 mt-20 md:mt-0`}>
          <TimeTick timeLeft={timeLeft} />
          {/* <Preview typingText={typingText} onTryAgain={onTryAgain} /> */}

          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              className="md:-z-10 absolute caret-transparent opacity-10 outline-none text-transparent h-28 border-transparent"
              autoFocus
              value={inpFieldValue}
              onChange={onTyping}
            />
            <div className="pb-8 text-2xl text-neutral-300 font-mono">
              <div className="leading-8 h-24 overflow-hidden">{typingText}</div>
            </div>

            <div className="flex items-center mt-4 justify-center">
              <button
                onClick={onTryAgain}
                className={`${
                  isTyping && "hidden"
                } p-4 outline-none cursor-pointer m-1 rounded-full hover:bg-neutral-700`}>
                <IoRefresh size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Typing
