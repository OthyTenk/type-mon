import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Container from "../components/Container"
import SignInGoogle from "../components/SignInGoogle"

const AuthPage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <Container>
      <SignInGoogle />
    </Container>
  )
}

export default AuthPage
