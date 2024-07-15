import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query"
import { BASE_URL } from "../utils/constants"
import { RootState } from "../app/store"

// Настройка базового запроса с URL и заголовками
const baseQuery = fetchBaseQuery({
  // Установка базового URL для всех запросов API
  baseUrl: `${BASE_URL}/api`,
  // Функция для подготовки заголовков перед каждым запросом
  prepareHeaders: (headers, { getState }) => {
    // Получение токена из состояния или локального хранилища
    const token =
      (getState() as RootState).auth.token || localStorage.getItem("token")
    // Установка заголовка Authorization с токеном, если он существует
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    // Возврат заголовков
    return headers
  },
})

// Настройка базового запроса с повторными попытками в случае ошибки
const baseQueryWithRetry = retry(baseQuery, {
  // Максимальное количество повторных попыток в случае ошибки
  maxRetries: 1,
})

// Создание API с использованием базового запроса с повторными попытками
export const api = createApi({
  // Использование настроенного базового запроса с повторными попытками
  baseQuery: baseQueryWithRetry,
  // Путь к редюсеру в хранилище Redux
  reducerPath: "splitApi",
  // Повторный запрос при монтировании компонента или изменении аргументов
  refetchOnMountOrArgChange: true,
  // Определение эндпоинтов API (пока пусто)
  endpoints: () => ({}),
})
