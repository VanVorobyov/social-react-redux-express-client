import { FC } from "react"
import styles from "./UserProfile.module.scss"

export interface IUserProfileProps {}

export const UserProfile: FC<IUserProfileProps> = () => {
  return <div className={styles.container}>UserProfile</div>
}
