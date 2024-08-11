import React, { FC, ReactNode } from "react"

interface ITypographyProps {
  children: ReactNode
  size?: "string"
}

export const Typography: FC<ITypographyProps> = ({
  children,
  size = "text-xl",
}) => {
  return <p className={`${size}`}>{children}</p>
}
