import React, { FC, InputHTMLAttributes, ReactElement } from "react"
import { Control, useController } from "react-hook-form"
import { Input as NextInput } from "@nextui-org/react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  control: Control<any>
  label: string
  endContent?: ReactElement
}

export const Input: FC<IInputProps> = ({
  name,
  label,
  placeholder,
  type,
  control,
  required,
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required },
  })

  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    />
  )
}
