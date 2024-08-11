import { FC, useState } from "react"

import {
  Card as NextUiCard,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@nextui-org/react"
import {
  useDislikePostMutation,
  useLikePostMutation,
} from "../../services/likeApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../services/postApi"
import { useDeleteCommentMutation } from "../../services/commentApi"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../services/userApi"
import { User } from "../user"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { RiDeleteBinLine } from "react-icons/ri"
import { hasErrorField } from "../../utils/has-error-field"
import { Typography } from "../typography"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { MetaInfo } from "../meta-info"
import { FcLike } from "react-icons/fc"

type TCardProps = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const Card: FC<TCardProps> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()
  const [dislikePost] = useDislikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const currentUser = useSelector(selectCurrent)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const refetchPosts = async () => {
    try {
      switch (cardFor) {
        case "post":
          await triggerGetAllPosts().unwrap()
          break
        case "comment":
          await triggerGetAllPosts().unwrap()
          break
        case "current-post":
          await triggerGetPostById(id).unwrap()
          break
        default:
          throw new Error("Не удалось запросить посты повторно")
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error: ", err.message)
      }
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  const handleDeletePost = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case "current-post":
          await deletePost(id).unwrap()
          navigate("/")
          break
        case "comment":
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error("")
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  const handleClick = async () => {
    try {
      likedByUser
        ? await dislikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()
      await refetchPosts()
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error (catch) in handleClick: ", err.message)
      }
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDeletePost}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcLike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  )
}
