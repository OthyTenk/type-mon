"use client"

import useGlobal from "@/store/useGlobal"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { useCallback, useEffect } from "react"

const languages = ["en", "mn"]

const Language = () => {
  const router = useRouter()
  const { language, isTyping, changeLanguage } = useGlobal()

  const onChangeLanguage = useCallback(
    (selectedLanguage: string) => {
      const url = qs.stringifyUrl(
        {
          url: "",
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

  useEffect(() => {
    onChangeLanguage(language)
  }, [onChangeLanguage, language])

  return (
    <ul className="gap-2 flex">
      {languages.map((lang, index) => (
        <li
          key={`time-${index}`}
          className={`${
            language === lang
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
