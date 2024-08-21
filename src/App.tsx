import { Button } from "@nextui-org/react"
import { ThemeContext } from "./components/theme-provider"
import { useContext } from "react"

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <>
      <div>Тема: {theme}</div>
      <Button onClick={toggleTheme}>Переключить тему</Button>
    </>
  )
}

export default App
