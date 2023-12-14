"use client"

import axios from "axios"
import { FC, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { SafeTypingText, SafeUser } from "../types"
import AppTitle from "./AppTitle"
import Button from "./Button"
import Container from "./Container"
import Heading from "./Heading"
import CategoryInput from "./inputs/CategoryInput"
import Input from "./inputs/Input"
import Navbar from "./navbar/Navbar"

import { useRouter } from "next/navigation"
import { TbBeach } from "react-icons/tb"

interface ISentenceProps {
  currentUser?: SafeUser | null
  sentences: SafeTypingText[]
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

const Sentence: FC<ISentenceProps> = ({ currentUser, sentences }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

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
        router.refresh()
      })
  }

  const newSentenceForm = (
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

  const AllSentence = ({ sentences }: { sentences: SafeTypingText[] }) => {
    if (!sentences.length) {
      return <div>Not found</div>
    }

    return (
      <ul className="space-y-3">
        {sentences.map((sentence, index) => {
          return (
            <li key={index}>
              <div className="flex p-3 bg-neutral-800 rounded-xl">
                <div className="w-[40px] flex justify-center items-center">
                  {index + 1}
                </div>
                <div className="w-4/5">{sentence.sentence.slice(0, 70)}</div>
                <div className="w-14 flex items-center justify-center">
                  {sentence.language}
                </div>
                <div className="w-14 flex items-center justify-center">
                  {sentence.length}
                </div>
                <div className="flex items-center justify-center">Delete</div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <>
      <Navbar currentUser={currentUser} />
      <AppTitle />
      <Container>
        <div className="px-2 md:px-44">
          <Heading title="Add New Sentence" />

          {newSentenceForm}
        </div>

        <div className="mt-10 border-b-neutral-600 border" />

        <div className="px-2 mt-8 md:px-44">
          <Heading title={`All Sentence (${sentences?.length})`} />

          <AllSentence sentences={sentences} />
        </div>
      </Container>
    </>
  )
}

export default Sentence
