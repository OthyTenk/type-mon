import getCurrentUser from "@/actions/getCurrentUser"
import getMyHistories from "@/actions/getHistories"
import History from "@/components/History"
import { redirect } from "next/navigation"

const HistoryDetailsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect("/auth/login")
  }

  const byUserEmail = currentUser.email ?? undefined

  const histories30 = await getMyHistories({ time: 30, byUserEmail })
  const histories60 = await getMyHistories({ time: 60, byUserEmail })
  const histories90 = await getMyHistories({ time: 90, byUserEmail })
  const histories120 = await getMyHistories({ time: 120, byUserEmail })

  return (
    <>
      <History
        currentUser={currentUser}
        histories30={histories30}
        histories60={histories60}
        histories90={histories90}
        histories120={histories120}
      />
    </>
  )
}

export default HistoryDetailsPage
