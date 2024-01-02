"use client"

import { FC, ReactNode, useEffect, useState } from "react"

interface ClientProps {
  children: ReactNode
}

const Client: FC<ClientProps> = ({ children }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  if (!load) {
    return null
  }

  return <>{children}</>
}

export default Client
