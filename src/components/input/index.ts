export enum TextFieldType {
  email = "email",
  password = "password",
  text = "text",
  number = "number",
  tel = "tel",
  url = "url",
}

export type TextFieldContext = {
  value: () => string,
  validate: () => void,
  setError: (message: string) => void,
}