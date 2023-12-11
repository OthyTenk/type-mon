import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import Sentence from "../components/Sentence"

const SentencePage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth")
  }

  return <Sentence currentUser={currentUser} />
}

export default SentencePage
