import { FC, ReactNode } from "react"
import ReactDOM from "react-dom"

type TModalProps = {
  children: ReactNode
}

export const Modal: FC<TModalProps> = ({ children }) => {
  const modalRoot = document.getElementById("modal-root") as
    | Element
    | DocumentFragment
  return ReactDOM.createPortal(<div className="">{children}</div>, modalRoot)
}
