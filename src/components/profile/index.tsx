import { FC } from "react"
import { selectCurrent } from "../../services/userApi"
import { useSelector } from "react-redux"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"
import { BASE_URL } from "../../utils/constants"
import { Link } from "react-router-dom"
import { MdAlternateEmail } from "react-icons/md"

type TProfileProps = {}

export const Profile: FC<TProfileProps> = () => {
  const current = useSelector(selectCurrent)

  if (!current) return null

  const { email, name, avatarUrl, id } = current

  return (
    <Card className={`py-4 w-[302px]`}>
      <CardHeader className={`pb-0 pt-2 px-4 flex-col items-center`}>
        <Image
          className={`object-cover rounded-b-xl`}
          alt={`Card profile picture`}
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  )
}
