import React from "react"

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input
      {...props}
      className={`input w-full ${props.className ?? ""}`}
    />
  )
}
