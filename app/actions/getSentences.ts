import prisma from "@/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getSentences = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    return []
  }

  const sentences = await prisma.typeText.findMany({
    take: 30,
    orderBy: {
      createdAt: "desc",
    },
  })

  return sentences
}

export default getSentences
