import prisma from "@/libs/db"
import { pusherServer } from "@/libs/pusher"
import { Player } from "@/types"
import { NextResponse } from "next/server"

const CounterTime = 5000

//sentence length
const Beginner = 60
const Medium = 120
const Master = 180

export const POST = async (request: Request) => {
  const body = await request.json()
  const { inputCode, userId } = body
  const gameCode = inputCode as string

  if (!gameCode || !userId) {
    return new NextResponse("Invalid User", { status: 401 })
  }

  const creatorOrj = await prisma.gamePlayer.findFirstOrThrow({
    where: {
      gameCode: gameCode,
    },
  })

  const { sentence } = await prisma.typeText.findFirstOrThrow({
    where: {
      language: "en",
    },
  })

  await prisma.gamePlayer.create({
    data: {
      gameCode: gameCode,
      playerId: userId,
    },
  })

  await pusherServer.trigger(gameCode, "has-joined-game", {
    gameCode: gameCode,
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
  await pusherServer.trigger(gameCode, "game-starts-in", {
    startTime: startsAt,
    sentence: sentence.substring(0, Beginner),
    creator,
    guest,
  })

  return NextResponse.json("ok")
}
