// Импорт api, созданного в другом файле
import { api } from "./api"
import { Like } from "../utils/types"

// добавляем эндпоинты в api в endpoints: () => ({})
export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    // Эндпоинт для лайка поста
    likePost: builder.mutation<
      Like, // Тип возвращаемых данных (ответ от сервера)
      { postId: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: postId => ({
        url: `/likes`, // URL для лайка поста
        method: "POST", // Метод запроса
        body: postId,
      }),
    }),

    // Эндпоинт для дизлайка поста
    dislikePost: builder.mutation<
      void, // Тип возвращаемых данных (ответ от сервера)
      string // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: postId => ({
        url: `/likes/${postId}`, // URL для дизлайка поста
        method: "DELETE", // Метод запроса
      }),
    }),
  }),
})

// Экспортируем автоматически сгенерированные хуки
export const {
  // хук выполняет запрос автоматически, когда компонент монтируется или изменяется
  useLikePostMutation,
  useDislikePostMutation,
} = likeApi

// Экспортируем эндпоинты
export const {
  endpoints: { likePost, dislikePost },
} = likeApi
