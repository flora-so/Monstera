export enum TextFieldType {
  email = "email",
  password = "password",
  text = "text",
  number = "number",
  tel = "tel",
  url = "url",
}

export type Context = {
  value: () => string,
  validate: () => void,
  setError: (message: string) => void,
}