"use server"

import prisma from "@/libs/db"
import { Prisma } from "@prisma/client"

export interface IHistoryProps {
  time: number
  byUserEmail?: string
}

const getHistories = async (params: IHistoryProps) => {
  let time = params ? params.time : 60
  let byUserEmail = params.byUserEmail

  let where: Prisma.MyHistoryWhereInput = {
    time,
  }

  if (byUserEmail) {
    where.userEmail = byUserEmail
  }

  try {
    const histories = await prisma.myHistory.findMany({
      where,
      take: 20,
      orderBy: [
        { wpm: "desc" },
        {
          createdAt: "desc",
        },
      ],
    })

    return histories
  } catch (error: unknown) {
    console.log("[getHistories] :", error)
    throw new Error(error as string)
  }
}

export default getHistories
