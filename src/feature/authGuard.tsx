// Этот компонент предназначен для защиты определённых маршрутов или компонентов,
// которые должны быть доступны только после проверки загрузки данных.
// Он показывает спиннер во время загрузки и отображает дочерние компоненты (children) после завершения загрузки.

import React, { FC } from "react"
import { useCurrentQuery } from "../services/userApi"
import { Spinner } from "@nextui-org/react"

export interface IAuthGuardProps {
  // Определение интерфейса IAuthGuardProps для типизации пропсов
  children: React.ReactNode // Дочерние элементы, которые будут рендериться после проверки загрузки
}

export const AuthGuard: FC<IAuthGuardProps> = ({ children }) => {
  // Определение функционального компонента AuthGuard
  // Использование хука useCurrentQuery (/services/userApi) для получения состояния загрузки
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    // Проверка, если данные все ещё загружаются
    return <Spinner /> // Если данные загружаются, показываем компонент Spinner
  }

  return children // Если загрузка завершена, возвращаем дочерние компоненты
}
