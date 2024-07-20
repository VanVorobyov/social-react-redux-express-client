import React, { FC } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom"

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <main className={`content`} role="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
