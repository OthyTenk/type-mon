import { redirect } from "next/navigation"

import getCurrentUser from "@/app/actions/getCurrentUser"
import Container from "@/app/components/Container"
import LoginForm from "@/app/components/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    nocache: true,
  },
}

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
