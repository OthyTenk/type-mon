import { NextResponse } from "next/server"
import prisma from "../../../../libs/prismadb"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { userId } = body

  if (!userId) {
    return new NextResponse("Invalid User", { status: 401 })
  }

  const game = await prisma.gamePlayer.findFirst({
    select: {
      gameCode: true,
    },
    where: {
      playerId: userId,
    },
  })

  if (!game) {
    return new NextResponse("No Game found", { status: 200 })
  }
  const { gameCode } = game

  await pusherServer.trigger(gameCode, "opponent-disconnected", {
    gameCode: gameCode,
  })

  await prisma.gamePlayer.deleteMany({
    where: {
      gameCode: gameCode,
    },
  })

  return NextResponse.json("ok")
}
