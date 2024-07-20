import { FC } from "react"
import styles from "./Following.module.scss"

export interface IFollowingProps {}

export const Following: FC<IFollowingProps> = () => {
  return <div className={styles.container}>Following</div>
}
