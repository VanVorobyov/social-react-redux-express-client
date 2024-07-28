import { User } from "../utils/types"
import { createSlice } from "@reduxjs/toolkit"
import { UserApi } from "../services/userApi"

// Определение интерфейса для начального состояния, который включает данные о пользователе, токене и статусе аутентификации
interface IInitialState {
  user: User | null
  isAuthenticated: boolean
  users: User[]
  current: User | null
  token?: string
}

// Установка начального состояния для слайса
const initialState: IInitialState = {
  user: null, // Текущий пользователь (null, если не аутентифицирован)
  isAuthenticated: false, // Флаг аутентификации
  users: [], // Список пользователей
  current: null, // Текущий пользователь (дублирует user, может использоваться для других целей)
}

// Создание слайса с именем "user", начальным состоянием и редюсерами
const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Редюсер для выхода пользователя из системы (сброс до начального состояния)
    logout: () => initialState,
    // Редюсер для сброса информации о пользователе и статуса аутентификации
    resetUser: state => {
      state.user = null
      state.isAuthenticated = false
    },
  },
  extraReducers: builder => {
    builder
      // Обработка успешного логина (установка токена и флага аутентификации)
      .addMatcher(
        UserApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token // Сохранение токена из ответа сервера
          state.isAuthenticated = true // Установка статуса аутентификации
        },
      )
      // Обработка получения текущего пользователя (установка текущего пользователя и флага аутентификации)
      .addMatcher(
        UserApi.endpoints.current.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true // Установка статуса аутентификации
          state.current = payload // Сохранение данных о текущем пользователе
        },
      )
      // Обработка получения пользователя по ID (установка данных пользователя)
      .addMatcher(
        UserApi.endpoints.getUserById.matchFulfilled,
        (state, { payload }) => {
          state.user = payload // Сохранение данных о пользователе
        },
      )
  },
})

// Экспорт действий (actions) для использования в компонентах и других частях приложения
export const { logout, resetUser } = slice.actions
// Экспорт редюсера для интеграции с хранилищем Redux
export default slice.reducer
