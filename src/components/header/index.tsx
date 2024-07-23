import { FC, useContext } from "react"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { ThemeContext } from "../theme-provider"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"

export const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

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
      </NavbarContent>
    </Navbar>
  )
}
