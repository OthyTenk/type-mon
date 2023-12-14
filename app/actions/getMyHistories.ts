import prisma from "@/libs/prismadb"

export interface IHistoryProps {
  time: number
}

const getMyHistories = async (params: IHistoryProps) => {
  let time = params ? params.time : 60
  console.log(time)
  const histories = await prisma.myHistory.findMany({
    where: {
      time,
    },
    take: 20,
    orderBy: {
      //   wpm: "desc",
      createdAt: "desc",
    },
  })

  console.log(histories)

  return histories
}

export default getMyHistories
