import { FC, useState } from "react"
import { Input } from "../components/Input"
import { Button, Link } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { useRegisterMutation } from "../services/userApi"
import { hasErrorField } from "../utils/has-error-field"

type Register = {
  email: string
  password: string
  name: string
}

type TRegisterProps = {
  setSelected: (value: string) => void
}

export const Register: FC<TRegisterProps> = ({ setSelected }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange", // Валидация срабатывает при изменении значений
    reValidateMode: "onBlur", // Повторная валидация при потере фокуса
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })
  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      console.log(data)
      const result = await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className={`flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required={"Обязательно поле"}
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required={"Обязательно поле"}
      />
      <Input
        control={control}
        name="name"
        label="Name"
        type="name"
        required={"Обязательно поле"}
      />
      <p className="text-center text-small">
        Уже есть аккаунт?&ensp;
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-in")}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
