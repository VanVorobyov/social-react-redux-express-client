import React, { FC, useContext } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom"
import { ThemeContext } from "../theme-provider"
import { Container } from "../container/Container"

export const Layout: FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <Header />
      <main
        className={`${theme} min-h-screen text-foreground bg-background`}
        role="main"
      >
        <Container>
          <p>привет</p>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}
