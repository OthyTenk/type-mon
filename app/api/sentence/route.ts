import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/libs/db"
import { NextResponse } from "next/server"

const POST = async (request: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  const body = await request.json()

  const { sentence, language } = body

  if (!language) {
    return new NextResponse("Language is required", {
      status: 400,
    })
  }

  if (!sentence) {
    return new NextResponse("Sentence is required", {
      status: 400,
    })
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
