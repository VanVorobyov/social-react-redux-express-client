// Этот файл настраивает и конфигурирует хранилище Redux для приложения, включая подключение редюсеров и миддлваров.
// Он определяет базовые компоненты, необходимые для управления глобальным состоянием, обработки API-запросов
// и управления сессиями пользователей через миддлвары и типы данных.

import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit" // Настройка и создание хранилища Redux
import { api } from "../services/api" // RTK Query API для работы с запросами
import user from "../feature/userSlice" // Редюсер для управления состоянием пользователя
import { listenerMiddleware } from "../middleware/auth" // Миддлвар для прослушивания событий

// Создание и конфигурация хранилища Redux
export const store = configureStore({
  reducer: {
    // Добавление редюсера, связанного с RTK Query API
    [api.reducerPath]: api.reducer, // Редюсер для обработки запросов и кэширования данных
    // Редюсер для управления состоянием пользователя
    user, // Редюсер для управления данными о пользователе и аутентификацией
  },
  // Настройка миддлваров
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      // Подключение миддлвара для работы с RTK Query API
      .concat(api.middleware) // Миддлвар для автоматической обработки API-запросов
      // Добавление кастомного listenerMiddleware для обработки событий
      .prepend(listenerMiddleware.middleware), // Миддлвар для прослушивания и обработки событий, таких как логин
})

// Определение типов для хранилища, состояния и диспетчера
export type AppStore = typeof store // Тип для хранилища Redux
export type RootState = ReturnType<typeof store.getState> // Тип для состояния приложения
export type AppDispatch = AppStore["dispatch"] // Тип для функции dispatch
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
> // Тип для thunk-действий, позволяющий создавать асинхронные действия
