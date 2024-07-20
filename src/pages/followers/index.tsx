import { FC } from "react"
import styles from "./Followers.module.scss"

export interface IFollowersProps {}

export const Index: FC<IFollowersProps> = () => {
  return <div className={styles.container}>Followers</div>
}
