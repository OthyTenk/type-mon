import prisma from "@/libs/prismadb"
import { SafeUser } from "../types"

export default async function getUsers() {
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
  } catch (error) {
    throw new Error(error as string)
  }
}
