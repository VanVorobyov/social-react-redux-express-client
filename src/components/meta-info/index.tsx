import { FC } from "react"
import { IconType } from "react-icons"

interface IMetaInfoProps {
  count: number
  Icon: IconType
}

export const MetaInfo: FC<IMetaInfoProps> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer max-h-fit ">
      {count > 0 ? (
        <p className="font-semibold text-l text-default-400">{count}</p>
      ) : null}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  )
}
