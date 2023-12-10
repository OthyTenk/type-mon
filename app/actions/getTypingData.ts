import prisma from "../../libs/prismadb"
import { DEFAULT_LANG } from "../site_settings"
import { SafeTypingText } from "../types"

export interface ITypingTextByLangSlug {
  lang?: string
}

export default async function getTypingTextByLang(
  params: ITypingTextByLangSlug
): Promise<SafeTypingText[]> {
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
    throw new Error(error as string)
  }
}
