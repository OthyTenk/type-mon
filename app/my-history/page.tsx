import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import MyHistory from "../components/MyHistory"

const MyHistoryPage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  return (
    <div>
      <MyHistory currentUser={currentUser} />
    </div>
  )
}

export default MyHistoryPage
