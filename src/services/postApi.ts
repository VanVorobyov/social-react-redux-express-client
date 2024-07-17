// Импорт api, созданного в другом файле
import { api } from "./api"
import { Post } from "../utils/types"

// добавляем эндпоинты в api в endpoints: () => ({})
export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    // Эндпоинт для создания поста
    createPost: builder.mutation<
      Post, // Тип возвращаемых данных (ответ от сервера)
      { content: string } // Тип данных, которые отправляются в запросе (тело запроса)
    >({
      query: postData => ({
        url: "/posts", // URL для создания поста
        method: "POST", // Метод запроса
        body: postData, // Тело запроса, содержащее данные поста
      }),
    }),

    // Эндпоинт для получения всех постов
    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/posts", // URL для получения всех постов
        method: "GET", // Метод запроса
      }),
    }),

    // Эндпоинт для получения поста по ID
    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `/posts/${id}`, // URL для получения поста по ID
        method: "GET", // Метод запроса
      }),
    }),

    // Эндпоинт для удаления поста
    deletePost: builder.mutation<Post, string>({
      query: id => ({
        url: `/posts/${id}`, // URL для удаления поста
        method: "DELETE", // Метод запроса
      }),
    }),
  }),
})

// Экспортируем автоматически сгенерированные хуки
export const {
  // хук выполняет запрос автоматически, когда компонент монтируется или изменяется
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  // хук с lazy выполняется только в момент явного вызова хука (сами дергаем запрос).
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postApi

// Экспортируем эндпоинты
export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postApi
