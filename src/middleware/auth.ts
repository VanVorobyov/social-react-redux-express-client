// Этот код используется для создания middleware, который прослушивает действия (actions) в Redux.
// Конкретно, он отслеживает успешные логины пользователей через RTK Query, и, когда пользователь успешно
// авторизуется, сохраняет JWT токен в localStorage для последующего использования (например, для аутентификации запросов).

import { createListenerMiddleware } from "@reduxjs/toolkit"
import { UserApi } from "../services/userApi"

// Создаёт middleware для прослушивания действий
export const listenerMiddleware = createListenerMiddleware()

// Запускает прослушивание действий
listenerMiddleware.startListening({
  // Устанавливает матчинг на успешное выполнение эндпоинта логина
  matcher: UserApi.endpoints.login.matchFulfilled,

  // Определяет побочный эффект, который выполняется при срабатывании матчера
  effect: async (action, listenerApi) => {
    // Отменяет все активные слушатели для предотвращения конкуренции
    listenerApi.cancelActiveListeners()

    // Проверяет, есть ли в payload токен
    if (action.payload.token) {
      // Сохраняет токен в localStorage для использования в будущих запросах
      localStorage.setItem("token", action.payload.token)
    }
  },
})
