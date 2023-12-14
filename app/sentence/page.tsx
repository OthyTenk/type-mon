import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import getSentences from "../actions/getSentences"
import Sentence from "../components/Sentence"

const SentencePage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    redirect("/auth/login")
  }

  const sentences = await getSentences()

  return <Sentence currentUser={currentUser} sentences={sentences} />
}

export default SentencePage
