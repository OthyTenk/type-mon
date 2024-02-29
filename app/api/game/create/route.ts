import { randomInt } from "crypto"
import { NextResponse } from "next/server"

import prisma from "@/libs/db"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { userId } = body

  const generateGameCode = randomInt(1000, 9999)
  const gameCode = `${generateGameCode}`

  await prisma.gamePlayer.create({
    data: {
      playerId: userId,
      gameCode: gameCode,
    },
  })

  return NextResponse.json({ gameCode })
}
