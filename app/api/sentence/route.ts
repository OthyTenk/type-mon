import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

const POST = async (request: Request) => {
  const body = await request.json()

  const { sentence, language } = body

  if (!language || !sentence) {
    throw new Error("Must fields not empty")
  }

  await prisma.typeText.create({
    data: {
      sentence,
      language,
      length: sentence.length,
    },
  })

  return NextResponse.json("OK")
}

export { POST }
