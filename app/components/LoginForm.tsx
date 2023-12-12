"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import Button from "./Button"
import Heading from "./Heading"
import Input from "./inputs/Input"

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success("Success")
        reset()
        router.refresh()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />
        <Input
          id="email"
          label="Email"
          type="email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="flex flex-col gap-6 mt-10">
        <Button
          outline
          disabled={isLoading}
          label="Continue"
          onClick={handleSubmit(onSubmit)}
        />

        <hr className="mt-4" />

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
        <div className="text-neutral-500 text-center mt-4 font-light">
          <p>
            First time using Airbnb?
            <span
              onClick={() => router.push("/auth")}
              className="text-neutral-500 font-semibold cursor-pointer hover:underline">
              {" "}
              Create an account
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginForm
