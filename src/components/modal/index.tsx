import { FC, ReactNode } from "react"
import ReactDOM from "react-dom"

type TModalProps = {
  children: ReactNode
}

export const Modal: FC<TModalProps> = ({ children }) => {
  const modalRoot = document.getElementById("modal-root") as
    | Element
    | DocumentFragment
  return ReactDOM.createPortal(
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 min-h-fit p-8 bg-white rounded-lg">
      {children}
    </div>,
    modalRoot,
  )
}
