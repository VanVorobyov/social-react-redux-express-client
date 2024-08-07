import { FC } from "react"
import { useGetAllPostsQuery } from "../../services/postApi"
import { CreatePost } from "../../components/create-post"

export interface IPostsProps {}

export const Posts: FC<IPostsProps> = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full flex">
        <CreatePost />
      </div>
      {data && data.length > 0 ? data.map(() => <div>Карточка</div>) : null}
    </>
  )
}
