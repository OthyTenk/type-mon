"use client"

import { FC } from "react"
import Container from "../Container"
import { SafeUser } from "@/app/types"
import UserMenu from "./UserMenu"
import Options from "../Options"
import Logo from "../Logo"

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="w-full z-10 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Options />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
