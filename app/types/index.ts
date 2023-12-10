import { TypeText } from "@prisma/client"

export type SafeTypingText = Omit<
  TypeText,
  "length" | "createdAt" | "updatedAt"
>
