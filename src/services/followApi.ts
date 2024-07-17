import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: builder => ({
    // Эндпоинт для подписки на пользователя
    followUser: builder.mutation<
      void, // Тип возвращаемых данных (ответ от сервера)
      { followingId: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: followingId => ({
        url: `/follow`, // URL для подписки на пользователя
        method: "POST", // Метод запроса
        body: followingId,
      }),
    }),

    // Эндпоинт для отписки от пользователя
    unfollowUser: builder.mutation<
      void, // Тип возвращаемых данных (ответ от сервера)
      { userId: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: userId => ({
        url: `/unfollow/${userId}`, // URL для отписки от пользователя
        method: "DELETE", // Метод запроса
      }),
    }),
  }),
})

// Экспортируем автоматически сгенерированные хуки
export const {
  // хук выполняет запрос автоматически, когда компонент монтируется или изменяется
  useFollowUserMutation,
  useUnfollowUserMutation,
} = followApi

// Экспортируем автоматически сгенерированные хуки
export const {
  endpoints: { followUser, unfollowUser },
} = followApi
