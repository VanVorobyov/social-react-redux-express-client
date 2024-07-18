/**
 * Компонент ThemeProvider обеспечивает контекст для управления темой (светлая или темная) во всем приложении.
 *
 * @example
 * // Включите ThemeProvider в корневой компонент вашего приложения, чтобы все дочерние компоненты имели доступ к контексту темы.
 * ReactDOM.render(
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>,
 *   document.getElementById('root')
 * );
 *
 * // Внутри любого компонента, вы можете использовать хук useContext для доступа к текущей теме и функции переключения темы.
 *   const { theme, toggleTheme } = useContext(ThemeContext);
 *   return (
 *       <p>Current theme: {theme}</p>
 *       <button onClick={toggleTheme}>Toggle Theme</button>
 *   );
 * };
 */

import React, { FC, ReactNode, useState } from "react"

// Интерфейс для пропсов провайдера темы
export interface IThemeProviderProps {
  children: ReactNode
}

// Тип контекста для темы
interface ThemeContextType {
  theme: "dark" | "light"
  toggleTheme: () => void
}

// Создание контекста темы с начальными значениями
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  // Получение сохранённой темы из localStorage, если она существует
  const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null

  // Установка текущей темы. Если темы в localStorage нет, используем "dark" по умолчанию
  const currentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark"

  // Используем хук useState для управления состоянием темы
  const [theme, setTheme] = useState<"dark" | "light">(currentTheme)

  // Функция для переключения темы между "light" и "dark"
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === "light" ? "dark" : "light"
      // Сохранение новой темы в localStorage
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  // Возвращаем провайдер контекста с текущей темой и функцией переключения темы
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
