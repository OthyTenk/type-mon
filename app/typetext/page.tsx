"use client"

import Button from "@/components/Button"
import Input from "@/components/inputs/Input"
import axios from "axios"
import { FC, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const TypeTextPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: "",
    },
  })

  const onInit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/typetext", data)
      .then(() => {
        reset()
      })
      .catch(() => {
        console.error("Some thing went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const formBody = (
    <div className="flex flex-col gap-4 mt-3 p-4">
      <Input
        id="id"
        label="ID"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <Button
        disabled={isLoading}
        outline
        label="Init Data"
        onClick={handleSubmit(onInit)}
      />
    </div>
  )

  return <div className="max-w-lg mx-auto">{formBody}</div>
}

export default TypeTextPage
