"use client"

import React from "react"
import Button from "./Button"
import { FcGoogle } from "react-icons/fc"
import { signIn } from "next-auth/react"

const SignInGoogle = () => {
  return (
    <div>
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
      />
    </div>
  )
}

export default SignInGoogle
