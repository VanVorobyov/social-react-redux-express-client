import { FC } from "react"
import styles from "./Followers.module.scss"

export interface IFollowersProps {}

export const Followers: FC<IFollowersProps> = () => {
  return <div className={styles.container}>Followers</div>
}
