import prisma from "@/libs/prismadb"
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
}

export default getHistories
