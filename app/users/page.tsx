import getCurrentUser from "@/actions/getCurrentUser"
import getUsers from "@/actions/getUsers"
import Users from "@/components/Users"
import { redirect } from "next/navigation"

const UsersPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || !currentUser.isAdmin) {
    redirect("/auth/login")
  }

  const users = await getUsers()

  return (
    <div>
      <Users currentUser={currentUser} users={users} />
    </div>
  )
}

export default UsersPage
