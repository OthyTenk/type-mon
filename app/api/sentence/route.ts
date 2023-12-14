import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

const POST = async (request: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    return NextResponse.error()
  }

  const body = await request.json()

  const { sentence, language } = body

  if (!language || !sentence) {
    return NextResponse.error()
  }

  const newSentence = await prisma.typeText.create({
    data: {
      sentence,
      language,
      length: sentence.length,
    },
  })

  return NextResponse.json(newSentence)
}

export { POST }
