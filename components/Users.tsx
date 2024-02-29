"use client"

import { formatDistance } from "date-fns"
import { FC } from "react"
import { SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Button from "./Button"
import Container from "./Container"
import Heading from "./Heading"
import Navbar from "./navbar/Navbar"

interface IUsersProps {
  currentUser?: SafeUser | null
  users: SafeUser[]
}

const Users: FC<IUsersProps> = ({ currentUser, users }) => {
  const renderedUsers = ({ users }: { users: SafeUser[] }) => {
    return (
      <ul className="flex flex-col gap-3">
        {users.map((user, index) => (
          <li key={index}>
            <div className="flex flex-col md:flex-row gap-2 bg-neutral-800 items-center justify-center">
              <div className="flex items-center gap-2">
                <div>{index + 1}</div>
                <div className="w-60">{user.email}</div>
                <div className="w-10">{user?.isAdmin ? "+" : "-"}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-40 flex-nowrap flex justify-end">
                  {formatDistance(new Date(user.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="w-28">
                  <Button label="Delete" onClick={() => {}} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44">
          <Heading title="All Users" />

          <div className="flex flex-col gap-4">{renderedUsers({ users })}</div>
        </div>
      </Container>
    </>
  )
}

export default Users
