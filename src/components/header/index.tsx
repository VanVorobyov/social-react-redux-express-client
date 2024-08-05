import { FC, useContext } from "react"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { ThemeContext } from "../theme-provider"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../services/userApi"
import { useNavigate } from "react-router-dom"
import { logout } from "../../feature/userSlice"
import { CiLogout } from "react-icons/ci"

export const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <Navbar className={`bg-background text-foreground ${theme}`}>
      <NavbarBrand>
        <p className={`font-bold text-inherit`}>Network Social</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem
          tabIndex={1}
          className={`lg:flex text3xl cursor-pointer`}
          onClick={() => toggleTheme()}
          onKeyDown={e => e.key === "Enter" && toggleTheme()}
        >
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {isAuthenticated && (
            <Button
              color="default"
              variant="flat"
              className="gap-2"
              onClick={handleLogout}
            >
              <CiLogout /> <span>Выйти</span>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
