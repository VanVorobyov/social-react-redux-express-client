import React, { FC, ReactNode, useContext } from "react"
import { ThemeContext } from "../theme-provider"

export interface IContainerProps {
  children: ReactNode
}

export const Container: FC<IContainerProps> = ({ children }) => {
  const { theme } = useContext(ThemeContext)

  return (
    <div
      className={`${theme} text-foreground bg-background flex max-w-screen-xl mx-auto `}
    >
      {children}
    </div>
  )
}
