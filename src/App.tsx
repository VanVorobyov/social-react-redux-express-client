import { Button } from "@nextui-org/react"
import { ThemeContext } from "./components/theme-provider"
import { useContext } from "react"

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <main className={`${theme} min-h-screen text-foreground bg-background`}>
      <div>Тема: {theme}</div>
      <Button onClick={toggleTheme}>Переключить тему</Button>
    </main>
  )
}

export default App
