import { redirect } from "next/navigation"

import getCurrentUser from "@/actions/getCurrentUser"
import Container from "@/components/Container"
import LoginForm from "@/components/LoginForm"

const LoginPage = async () => {
  const currentUser = await getCurrentUser()

  if (currentUser) {
    redirect("/")
  }

  return (
    <Container>
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <LoginForm />
      </div>
    </Container>
  )
}

export default LoginPage
