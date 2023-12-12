export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/my-history", "/sentence", "/users"],
}
