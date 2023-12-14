import { MyHistory, TypeText, User } from "@prisma/client"

export type SafeTypingText = Omit<TypeText, "createdAt" | "updatedAt">

export type SafeUser = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type SafeHistory = MyHistory
