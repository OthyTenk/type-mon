import { NextResponse } from "next/server"
import prisma from "../../../../libs/prismadb"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { inputCode, userId } = body

  if (!inputCode || !userId) {
    return new NextResponse("Invalid User", { status: 401 })
  }

  await prisma.gamePlayer.create({
    data: {
      gameCode: inputCode,
      playerId: userId,
    },
  })

  await pusherServer.trigger("game", "has-joined-game", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    gameCode: inputCode,
  })

  //counter
  const counterTime = 5000
  const startsAt = new Date().getTime() + counterTime

  await pusherServer.trigger("game", "game-starts-in", counterTime)

  const interval = setInterval(async () => {
    const remaining = startsAt - new Date().getTime()
    if (remaining > 0) {
      await pusherServer.trigger("game", "game-starts-in", remaining)
    } else {
      await pusherServer.trigger("game", "lets-go", 0)
      clearInterval(interval)
    }
  }, 1000)
  //   io.sockets.to(gameCode).emit("game-state", gameState[gameCode]);

  return NextResponse.json("ok")
}
