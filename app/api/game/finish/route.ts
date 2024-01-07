import { NextResponse } from "next/server"
import { pusherServer } from "../../../../libs/pusher"

export const POST = async (request: Request) => {
  const body = await request.json()

  const { result, gameCode } = body

  if (!gameCode) {
    return new NextResponse("Bad request", { status: 500 })
  }

  console.log(gameCode)
  console.log(result)

  await pusherServer.trigger(gameCode, "game-finish", {
    result: result,
  })

  return NextResponse.json("ok")
}
