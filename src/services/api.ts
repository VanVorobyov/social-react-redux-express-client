// Этот файл определяет базовые настройки для API-запросов, включая обработку токенов и повторные попытки
// при ошибках. Используется RTK Query для автоматической генерации запросов и кэширования данных.

/*
 * Основные компоненты кода и их функции:
 *
 * 1. **`fetchBaseQuery` и `prepareHeaders`**:
 *    - `fetchBaseQuery` используется для создания базовой настройки запросов, включая URL и заголовки.
 *    - Функция `prepareHeaders` позволяет изменять заголовки перед отправкой запроса. Она используется для добавления
 *      токена авторизации в заголовки каждого запроса, если токен доступен.
 *      Токен берется из состояния `user` (../feature/userSlice.ts) или
 *      `localStorage` (если пользователь уже авторизовался ранее).
 *      - `getState`: функция, возвращающая текущее состояние Redux, позволяющая получить нужные данные, например, токен.
 *      - `headers.set("Authorization", `Bearer ${token}`)`: устанавливает заголовок Authorization с токеном в формате Bearer.
 */

import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../utils/constants"
import { RootState } from "../app/store"

// Настройка базового запроса с URL и заголовками
const baseQuery = fetchBaseQuery({
  // Установка базового URL для всех запросов API
  baseUrl: `${BASE_URL}/api`,
  // Функция для подготовки заголовков перед каждым запросом
  prepareHeaders: (headers, { getState }) => {
    // Извлечение состояния приложения
    const state = getState() as RootState
    // Получение токена из состояния user или из localStorage
    const token = state.user.token || localStorage.getItem("token")
    // Установка заголовка Authorization с токеном, если он существует
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
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
  // Уникальный путь к редюсеру в хранилище Redux
  reducerPath: "splitApi", // splitApi - уникальный ключ для редюсера, может быть любым
  // Использование настроенного базового запроса с повторными попытками
  baseQuery: baseQueryWithRetry,
  // Повторный запрос при монтировании компонента или изменении аргументов
  refetchOnMountOrArgChange: true,
  // Определение эндпоинтов API
  endpoints: () => ({}), // Эндпоинты будут добавлены с использованием injectEndpoints
  // или прописываются все эндпоинты внутри :)
})
