import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

import prisma from "@/libs/db"

const POST = async (request: Request) => {
  const body = await request.json()
  const { email, name, password } = body

  const isExists = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email,
    },
  })

  if (isExists) {
    return new NextResponse("Already exists", { status: 409 })
  }

  const isFirst = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  })

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      isAdmin: isFirst === null,
    },
  })

  return NextResponse.json(user)
}

export { POST }
