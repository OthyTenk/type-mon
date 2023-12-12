"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import Button from "./Button"
import Heading from "./Heading"
import Input from "./inputs/Input"
import { signIn } from "next-auth/react"

const SignUpForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/auth/register", data)
      .then(() => {
        toast.success("Success")

        reset()

        router.push("auth/login")
      })
      .catch((error) => {
        let error_msg =
          error?.response.status === 409
            ? "Already exists"
            : "Something went wrong"
        console.error(error_msg)
        toast.error(error_msg)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Type Mon" subtitle="Create an account!" />
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
          id="name"
          label="Name"
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
          <div className="flex flex-row justify-center items-center gap-2">
            <div>Already have an account?</div>
            <div
              onClick={() => router.push("auth/login")}
              className="text-neutral-500 font-semibold cursor-pointer hover:underline">
              Log in
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
