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
      id: true,
    },
    where: {
      playerId: userId,
    },
  })

  if (!game) {
    return new NextResponse("Not found game", { status: 200 })
  }

  await pusherServer.trigger("game", "opponent-disconnected", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    gameCode: game.gameCode,
  })

  await prisma.gamePlayer.deleteMany({
    where: {
      gameCode: game.gameCode,
    },
  })

  return NextResponse.json("ok")
}
