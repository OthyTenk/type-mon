import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import getSentences from "../actions/getSentences"
import Sentence from "../components/Sentence"
import { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
}

const SentencePage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    redirect("/auth/login")
  }

  const sentences = await getSentences()

  return <Sentence currentUser={currentUser} sentences={sentences} />
}

export default SentencePage
