import { FC } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../components/Input"
import { Button, Link } from "@nextui-org/react"

export interface ILoginProps {
  setSelected: (key: string) => void
}

export interface Login {
  email: string
  password: string
}

export const Login: FC<ILoginProps> = ({ setSelected }) => {
  const {
    control, // Управляет полями формы и связывает их с useController
    handleSubmit, // Функция для обработки отправки формы
    formState: { errors }, // Объект с ошибками валидации полей
  } = useForm<Login>({
    mode: "onChange", // Валидация срабатывает при изменении значений
    reValidateMode: "onBlur", // Повторная валидация при потере фокуса
    defaultValues: {
      email: "", // Начальное значение для поля email
      password: "", // Начальное значение для поля password
    },
  })

  return (
    <form className={`flex flex-col gap-4`}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required={true}
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required={true}
      />
      <p className="text-center text-small">
        Нет аккаунта?&ensp;
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit">
          Войти
        </Button>
      </div>
    </form>
  )
}
