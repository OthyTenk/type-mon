import { NextResponse } from "next/server"
import prisma from "../../../../libs/prismadb"
import { pusherServer } from "../../../../libs/pusher"
import { Player } from "@/types"

const CounterTime = 5000

export const POST = async (request: Request) => {
  const body = await request.json()
  const { inputCode, userId } = body

  if (!inputCode || !userId) {
    return new NextResponse("Invalid User", { status: 401 })
  }

  const creatorOrj = await prisma.gamePlayer.findFirstOrThrow({
    where: {
      gameCode: inputCode,
    },
  })
  const { sentence } = await prisma.typeText.findFirstOrThrow({
    where: {
      language: "en",
    },
  })

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

  const creator: Player = {
    id: creatorOrj.playerId,
    name: creatorOrj.playerId,
    charPosition: 0,
  }

  const guest: Player = {
    id: userId,
    name: userId,
    charPosition: 0,
  }

  //counter
  const startsAt = new Date().getTime() + CounterTime
  await pusherServer.trigger("game", "game-starts-in", {
    startTime: startsAt,
    sentence,
    creator,
    guest,
  })

  return NextResponse.json("ok")
}
