import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import MyHistory from "../components/MyHistory"
import getMyHistories from "../actions/getMyHistories"

const MyHistoryPage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  const histories30 = await getMyHistories({ time: 30 })
  const histories60 = await getMyHistories({ time: 60 })
  const histories90 = await getMyHistories({ time: 90 })
  const histories120 = await getMyHistories({ time: 120 })

  return (
    <div>
      <MyHistory
        currentUser={currentUser}
        histories30={histories30}
        histories60={histories60}
        histories90={histories90}
        histories120={histories120}
      />
    </div>
  )
}

export default MyHistoryPage
