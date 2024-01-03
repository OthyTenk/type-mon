import { NextResponse } from "next/server"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()

  const { position } = body

  if (position === undefined || position === null) {
    console.log("Bad request")
    console.log("position", position)
    return new NextResponse("Bad request", { status: 500 })
  }

  await pusherServer.trigger("game", "opponent-position", {
    // gameCode: `${JSON.stringify(inputCode)}\n\n`,
    position: position,
  })

  return NextResponse.json("ok")
}
