import { sentences } from "@/data/sentences"
import prisma from "@/libs/db"

import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { id } = body

  if (!id || typeof id !== "string") {
    return new NextResponse("Id is required", { status: 400 })
  }

  if (id !== process.env.TEMP_ADMIN) {
    return new NextResponse("You don`t have access", { status: 403 })
  }
  const texts = sentences.map((s) => ({
    sentence: s.text,
    language: s.language,
    length: s.text.length,
  }))

  await prisma.typeText.createMany({
    data: texts,
  })

  return NextResponse.json("OK")
}
