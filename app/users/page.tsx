import { redirect } from "next/navigation"
import getCurrentUser from "../actions/getCurrentUser"
import Users from "../components/Users"

const UsersPage = async () => {
  let currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    redirect("/auth/login")
  }

  return (
    <div>
      <Users currentUser={currentUser} />
    </div>
  )
}

export default UsersPage
