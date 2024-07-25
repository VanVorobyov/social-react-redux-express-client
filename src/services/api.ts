import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../utils/constants"

// Настройка базового запроса с URL и заголовками
const baseQuery = fetchBaseQuery({
  // Установка базового URL для всех запросов API
  baseUrl: `${BASE_URL}/api`,
  // Функция для подготовки заголовков перед каждым запросом
  // prepareHeaders: (headers, { getState }) => {
  //   const state = getState() as RootState
  //   console.log("State:", state)
  //   // Получение токена из состояния auth или из localStorage
  //   const token = state.auth?.token || localStorage.getItem("token")
  //   console.log("Token:", token)
  //   // Установка заголовка Authorization с токеном, если он существует
  //   if (token) {
  //     headers.set("Authorization", `Bearer ${token}`)
  //   }
  //   return headers
  // },
})

// Настройка базового запроса с повторными попытками в случае ошибки
const baseQueryWithRetry = retry(baseQuery, {
  // Максимальное количество повторных попыток в случае ошибки
  maxRetries: 1,
})

// Создание API с использованием базового запроса с повторными попытками
export const api = createApi({
  // Путь к редюсеру в хранилище Redux
  reducerPath: "splitApi", // splitApi это уникальный ключ - имя пути, может быть любым
  // Использование настроенного базового запроса с повторными попытками
  baseQuery: baseQueryWithRetry,
  // Повторный запрос при монтировании компонента или изменении аргументов
  refetchOnMountOrArgChange: true,
  // Определение эндпоинтов API
  endpoints: () => ({}), // при создании отдельных файлов вызывается метод injectEndpoints
  // или прописываются все эндпоинты внутри :)
})
