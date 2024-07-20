import { FC } from "react"
import styles from "./Index.module.scss"

export interface ICurrentPostProps {}

export const CurrentPost: FC<ICurrentPostProps> = () => {
  return <div className={styles.container}>Index</div>
}
