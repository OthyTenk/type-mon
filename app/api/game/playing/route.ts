import { NextResponse } from "next/server"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()

  const { position, currentUserId, gameCode } = body

  if (position === undefined || position === null || !gameCode) {
    return new NextResponse("Bad request", { status: 500 })
  }

  await pusherServer.trigger(gameCode, "opponent-position", {
    position: position,
    userId: currentUserId,
  })

  return NextResponse.json("ok")
}
