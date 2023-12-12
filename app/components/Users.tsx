"use client"

import { FC } from "react"
import { SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Container from "./Container"
import Heading from "./Heading"
import Navbar from "./navbar/Navbar"

interface IUsersProps {
  currentUser?: SafeUser | null
}

const Users: FC<IUsersProps> = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44">
          <Heading title="All Users" />

          <div className="flex flex-col gap-4">users</div>
        </div>
      </Container>
    </>
  )
}

export default Users
