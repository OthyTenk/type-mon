"use client"

import { SafeUser } from "@/types"
import { FC } from "react"
import Container from "../Container"
import Options from "../Options"
import UserMenu from "./UserMenu"

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="w-full z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Options />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </nav>
  )
}

export default Navbar
