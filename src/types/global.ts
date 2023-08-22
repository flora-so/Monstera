export type FileInputValidator = (file: File) => string;

export type InputValidator = (value: string) => string;

export type DropdownItem = {
  label: string,
  value: string,
  colour?: string,
}

export type ActionItem = {
  label: string,
  method: (data: any) => void,
  colour?: string,
}