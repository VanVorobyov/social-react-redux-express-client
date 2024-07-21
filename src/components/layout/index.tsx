import React, { FC, useContext } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom"
import { ThemeContext } from "../theme-provider"

export const Layout: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <>
      <Header />
      <main
        className={`${theme} min-h-screen text-foreground bg-background`}
        role="main"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
