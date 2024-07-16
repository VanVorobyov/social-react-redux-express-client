// Импорт api, созданного в другом файле
import { api } from "./api"
import { User } from "../utils/types"

// добавляем эндпоинты в api в endpoints: () => ({})
export const UserApi = api.injectEndpoints({
  endpoints: builder => ({
    // Эндпоинт для логина
    login: builder.mutation<
      { token: string }, // Тип возвращаемых данных (ответ от сервера)
      { email: string; password: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: userData => ({
        url: "/login", // URL для логина
        method: "POST", // Метод запроса
        body: userData, // Тело запроса, содержащее данные пользователя
      }),
    }),

    // Эндпоинт для регистрации
    register: builder.mutation<
      { email: string; password: string; name: string }, // Тип возвращаемых данных (ответ от сервера)
      { email: string; password: string; name: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: userData => ({
        url: "/register", // URL для регистрации
        method: "POST", // Метод запроса
        body: userData, // Тело запроса, содержащее данные пользователя
      }),
    }),

    // Эндпоинт для получения текущего пользователя
    current: builder.query<User, void>({
      query: () => ({
        url: "/current", // URL для получения текущего пользователя
        method: "GET", // Метод запроса
      }),
    }),

    // Эндпоинт для получения пользователя по ID
    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/users/${id}`, // URL для получения пользователя по ID
        method: "GET", // Метод запроса
      }),
    }),

    // Эндпоинт для обновления данных пользователя
    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`, // URL для обновления данных пользователя
        method: "PUT", // Метод запроса
        body: userData, // Тело запроса, содержащее новые данные пользователя
      }),
    }),
  }),
})

// Экспортируем автоматически сгенерированные хуки
export const {
  // хук выполняет запрос автоматически, когда компонент монтируется или изменяется
  useLoginMutation,
  useRegisterMutation,
  useCurrentQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  // хук с lazy выполняется только в момент явного вызова хука (сами дергаем запрос).
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} = UserApi

// Экспортируем эндпоинты
export const {
  endpoints: { login, register, current, getUserById, updateUser },
} = UserApi
