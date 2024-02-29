"use client"

import { FC, MouseEvent } from "react"
import type { IconType } from "react-icons"

interface IButtonProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}

const Button: FC<IButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 dark:hover:opacity-50 transition w-full ${
        outline
          ? "bg-white dark:bg-neutral-700"
          : "bg-neutral-500 dark:bg-neutral-500"
      } 
      ${
        outline
          ? "border-black dark:border-gray-500"
          : "bg-neutral-500 dark:bg-neutral-800"
      } 
      ${
        outline
          ? "text-black dark:text-gray-300"
          : "text-white dark:text-neutral-200"
      } 
      ${small ? "text-sm" : "text-md"} 
      ${small ? "py-1" : "py-3"} 
      ${small ? "font-light" : "font-semibold"} 
      ${small ? "border-[1px]" : "border-2"}`}>
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

export default Button
