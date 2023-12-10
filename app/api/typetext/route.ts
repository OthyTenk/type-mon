import { sentences } from "@/app/data/sentences"
import prisma from "@/libs/prismadb"

import { NextResponse } from "next/server"

// export const dynamic = "force-static"

export const POST = async (request: Request) => {
  const body = await request.json()
  const { id } = body

  if (!id || typeof id !== "string") {
    throw new Error("Invalid ID")
  }

  if (id !== process.env.TEMP_ADMIN) {
    throw new Error("You don`t have access")
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
