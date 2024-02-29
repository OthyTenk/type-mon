"use server"

import prisma from "@/libs/db"
import getCurrentUser from "./getCurrentUser"

const getSentences = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    return []
  }

  try {
    const sentences = await prisma.typeText.findMany({
      take: 30,
      orderBy: {
        createdAt: "desc",
      },
    })

    return sentences
  } catch (error: unknown) {
    console.error("[getSentences] :", error)
    throw new Error(error as string)
  }
}

export default getSentences
