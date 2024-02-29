"use server"

import prisma from "@/libs/db"
import { SafeUser } from "../types"

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    })

    const safeUsers = users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }))

    return safeUsers as SafeUser[]
  } catch (error: unknown) {
    console.log("[getUsers] :", error)
    throw new Error(error as string)
  }
}

export default getUsers
