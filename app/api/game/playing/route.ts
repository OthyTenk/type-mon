import { NextResponse } from "next/server"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()

  const { position, currentUserId } = body

  if (position === undefined || position === null) {
    return new NextResponse("Bad request", { status: 500 })
  }

  await pusherServer.trigger("game", "opponent-position", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    position: position,
    userId: currentUserId,
  })

  return NextResponse.json("ok")
}
