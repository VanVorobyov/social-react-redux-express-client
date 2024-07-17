// Импорт api, созданного в другом файле
import { api } from "./api"
import { Comment } from "../utils/types"

// добавляем эндпоинты в api в endpoints: () => ({}) c помощью injectEndpoints
export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    // Эндпоинт для создания комментария
    createComment: builder.mutation<
      Comment, // Тип возвращаемых данных (ответ от сервера)
      Partial<Comment> // Тип данных, которые отправляются в запросе (тело запроса), Partial делает тип данных необязательным
    >({
      query: comment => ({
        url: `/comments`, // URL для создания комментария
        method: "POST", // Метод запроса
        body: comment, // Тело запроса, содержащее данные комментария
      }),
    }),

    // Эндпоинт для удаления комментария
    deleteComment: builder.mutation<void, string>({
      query: id => ({
        url: `/comments/${id}`, // URL для удаления комментария
        method: "DELETE", // Метод запроса
      }),
    }),
  }),
})

// Экспортируем автоматически сгенерированные хуки
export const {
  // хук выполняет запрос автоматически, когда компонент монтируется или изменяется
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi

// Экспортируем эндпоинты
export const {
  endpoints: { createComment, deleteComment },
} = commentApi
