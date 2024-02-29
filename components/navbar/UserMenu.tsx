"use client"

import { SafeUser } from "@/types"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FC, useCallback, useState } from "react"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <Avatar src={currentUser?.image} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-44 bg-neutral-700 overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {currentUser.isAdmin && (
                  <>
                    <MenuItem
                      onClick={() => router.push("/sentence")}
                      label="New Sentence"
                    />
                    <MenuItem
                      onClick={() => router.push("/users")}
                      label="Users"
                    />
                    <MenuItem
                      onClick={() => router.push("/history")}
                      label="All typing history"
                    />
                  </>
                )}
                <MenuItem
                  onClick={() => router.push(`/history/${currentUser.email}`)}
                  label="My typing history"
                />

                <hr className="border-neutral-600" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={() => router.push("auth")} label="Sign up" />
                <MenuItem
                  onClick={() => router.push("/auth/login")}
                  label="Login"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
