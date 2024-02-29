import { pusherServer } from "@/libs/pusher"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const body = await request.json()

  const { result, gameCode } = body

  if (!gameCode) {
    return new NextResponse("Bad request", { status: 500 })
  }

  await pusherServer.trigger(gameCode, "game-finish", result)

  return NextResponse.json("ok")
}
