import Link from "next/link"

const NotFoundPage = () => {
  return (
    <article className="h-100w w-100vw flex flex-col items-center justify-center">
      <p className="p-28 text-2xl">Oops! Page Not Found</p>

      <Link href="/" className="p-4">
        Back To Home
      </Link>
    </article>
  )
}

export default NotFoundPage
