"use client"

import { FC, useState } from "react"
import { SafeUser } from "../types"
import Navbar from "./navbar/Navbar"
import AppTitle from "./AppTitle"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import Input from "./inputs/Input"
import Container from "./Container"
import Heading from "./Heading"
import Button from "./Button"
import CategoryInput from "./inputs/CategoryInput"

import { TbBeach } from "react-icons/tb"

interface ISentenceProps {
  currentUser?: SafeUser | null
}

export const languages = [
  {
    label: "mn",
    icon: null,
    description: "Mongolia",
  },
  {
    label: "en",
    icon: null,
    description: "English",
  },
]

const Sentence: FC<ISentenceProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      sentence: "",
      language: "",
    },
  })

  const language = watch("language")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/sentence", data)
      .then(() => {
        toast.success("Success")
        reset()
      })
      .catch((error) => {
        console.error(error)
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="sentence"
        label="Sentence text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {languages.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("language", category)}
              selected={language === item.label}
              label={item.label}
              icon={TbBeach}
            />
          </div>
        ))}
      </div>

      <Button
        disabled={isLoading}
        label="Save"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )

  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44">
          {currentUser?.name}
          <Heading title="Add New Sentence" />

          {bodyContent}
        </div>
      </Container>
    </>
  )
}

export default Sentence
