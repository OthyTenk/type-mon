import getCurrentUser from "@/actions/getCurrentUser"
import getMyHistories from "@/actions/getHistories"
import History from "@/components/History"
import { redirect } from "next/navigation"

const HistoryPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    redirect("/auth/login")
  }

  const histories30 = await getMyHistories({ time: 30 })
  const histories60 = await getMyHistories({ time: 60 })
  const histories90 = await getMyHistories({ time: 90 })
  const histories120 = await getMyHistories({ time: 120 })

  return (
    <>
      <History
        title="Typing Histories of all users"
        currentUser={currentUser}
        histories30={histories30}
        histories60={histories60}
        histories90={histories90}
        histories120={histories120}
      />
    </>
  )
}

export default HistoryPage
