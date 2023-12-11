"use client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import { SafeUser } from "@/app/types"
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
  const registerModal = useRegisterModal()

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
                <MenuItem
                  onClick={() => router.push("sentence")}
                  label="New Sentence"
                />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                {/* <MenuItem onClick={loginModal.onOpen} label="Login" />*/}
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                <MenuItem onClick={() => {}} label="Login" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
