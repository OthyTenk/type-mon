import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/libs/db"
import { NextResponse } from "next/server"

interface IParams {
  userEmail?: string | null
}

const POST = async (request: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  const { userEmail } = params

  if (
    !userEmail ||
    typeof userEmail !== "string" ||
    userEmail !== currentUser.email
  ) {
    return new NextResponse("Unauthenticated", { status: 403 })
  }

  const body = await request.json()

  const { time, wpm, cpm, mistakes, language } = body

  await prisma.myHistory.create({
    data: {
      time,
      wpm,
      cpm,
      mistakes,
      language,
      userEmail,
    },
  })

  return NextResponse.json("ok")
}

export { POST }
