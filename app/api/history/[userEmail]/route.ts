import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

interface IParams {
  userEmail?: string | null
}

const POST = async (request: Request, { params }: { params: IParams }) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  const { userEmail } = params

  if (
    !userEmail ||
    typeof userEmail !== "string" ||
    userEmail !== currentUser.email
  ) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
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
