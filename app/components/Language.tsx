"use client"

import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useCallback, useEffect } from "react"
import useIsTyping from "../hooks/useIsTyping"

const languages = ["en", "mn"]

const Language = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isTyping, currentLanguage, changeLanguage } = useIsTyping()

  useEffect(() => {
    const paramLang = searchParams.get("lang")

    if (!paramLang) return

    if (currentLanguage !== paramLang) {
      changeLanguage(paramLang)
    }
  }, [changeLanguage, currentLanguage, searchParams])

  const onChangeLanguage = useCallback(
    (selectedLanguage: string) => {
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: {
            lang: selectedLanguage,
          },
        },
        { skipNull: true }
      )
      changeLanguage(selectedLanguage)

      router.push(url)
    },
    [router, changeLanguage]
  )

  return (
    <ul className="gap-2 flex">
      {languages.map((lang, index) => (
        <li
          key={`time-${index}`}
          className={`${
            currentLanguage === lang
              ? isTyping
                ? "text-transparent"
                : "text-yellow-600 underline"
              : ""
          } cursor-pointer hover:opacity-75 hover:underline`}
          onClick={() => onChangeLanguage(lang)}>
          {lang}
        </li>
      ))}
    </ul>
  )
}

export default Language
