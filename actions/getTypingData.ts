"use server"

import prisma from "@/libs/db"
import { DEFAULT_LANG } from "@/site_settings"
import { SafeTypingText } from "@/types"

export interface ITypingTextByLangSlug {
  lang?: string
}

const getTypingTextByLang = async (
  params: ITypingTextByLangSlug
): Promise<SafeTypingText[]> => {
  const language = params ? params.lang : DEFAULT_LANG

  try {
    const typingTexts = await prisma.typeText.findMany({
      where: {
        language,
      },
    })

    if (!typingTexts) {
      return []
    }

    return typingTexts
  } catch (error: unknown) {
    console.error("[getTypingTextByLang] :", error)
    throw new Error(error as string)
  }
}

export default getTypingTextByLang
