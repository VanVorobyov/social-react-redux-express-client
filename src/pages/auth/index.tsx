import { FC } from "react"
import styles from "./Index.module.scss"

export interface IAuthProps {}

export const Auth: FC<IAuthProps> = () => {
  return <div className={styles.container}>Auth</div>
}
