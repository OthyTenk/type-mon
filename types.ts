import { MyHistory, TypeText, User } from "@prisma/client"

export interface StartGame {
  startTime: number
  sentence: string
  creator: Player
  guest?: Player
}

export interface Player {
  id: string
  charPosition: number
  playAgain?: boolean
  disconnected?: boolean
  name: string
}

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
