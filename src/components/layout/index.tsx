import React, { FC, useContext, useEffect } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet, useNavigate } from "react-router-dom"
import { ThemeContext } from "../theme-provider"
import { Container } from "../container/Container"
import { NavBar } from "../nav-bar"
import { useSelector } from "react-redux"
import { selectIsAuthenticated, selectUser } from "../../services/userApi"
import { Profile } from "../profile"

export const Layout: FC = () => {
  const { theme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/auth")
    }
  }, [])

  return (
    <>
      <Header />
      <main
        className={`${theme} min-h-screen text-foreground bg-background`}
        role="main"
      >
        <Container>
          <div className="flex-2 p-4">
            <NavBar />
          </div>
          <div className="flex-2 p-4">
            <Outlet />
          </div>
          <div className="flex-2 p-4">
            <div className="flex-col flex gap-5">{!user && <Profile />}</div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
