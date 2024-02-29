import Container from "@/components/Container"
import SignUpForm from "@/components/SignUpForm"
import authOptions from "@/libs/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const AuthPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <Container>
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <SignUpForm />
      </div>
    </Container>
  )
}

export default AuthPage
