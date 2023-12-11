import { TypeText, User } from "@prisma/client"

export type SafeTypingText = Omit<
  TypeText,
  "length" | "createdAt" | "updatedAt"
>

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}
