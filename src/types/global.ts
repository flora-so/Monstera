export class DataFrame {
  columns: string[];
  data: { [key: string]: number | string }[];

  constructor(columns: string[], data: { [key: string]: number | string }[]) {
    this.columns = columns;
    this.data = data;
  }
}

export type OverlayContext = {
  show: () => void,
  hide: () => void,
}

export enum InputType {
  email = "email",
  password = "password",
  text = "text",
  number = "number",
  tel = "tel",
  url = "url",
}

export type InputContext = {
  value: () => string,
  validate: () => void,
  focus: () => void,
  setError: (message: string) => void,
}

export type InputValidator = (value: string) => string;

export type DropdownItem = {
  label: string,
  value: string,
  colour?: string,
}

export enum DropdownAlignment {
  left = "ltr",
  right = "rtl"
}

export enum DropdownPosition {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}

export enum Colours {
  primary = "primary",
  accent = "accent",
  success = "success",
  danger = "danger",
  warning = "warning",
}

export enum Theme {
  light = "light",
  dark = "dark",
}