import { FC } from "react"
import styles from "./Posts.module.scss"

export interface IPostsProps {}

export const Posts: FC<IPostsProps> = () => {
  return <div className={styles.container}>Posts</div>
}
