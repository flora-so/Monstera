import { ComputedRef, InjectionKey } from "vue";

export const InjectedKeys = {
  theme: Symbol("msr__theme") as InjectionKey<ComputedRef<Theme>>,
  // loading: Symbol("msr__loading") as InjectionKey<>,
  // snackbar: Symbol("msr__snackbar") as InjectionKey<>,
  // scroll: Symbol("msr__scroll") as InjectionKey<>,
  // context: Symbol("msr__context") as InjectionKey<>,
}

export enum Theme {
  light = "light",
  dark = "dark",
}

export enum ThemeMode {
  light = "light",
  dark = "dark",
  system = "system",
}

export enum FontWeight {
  thin = 100,
  extraLight = 200,
  light = 300,
  normal = 400,
  medium = 500,
  semiBold = 600,
  bold = 700,
  extraBold = 800,
  black = 900,
}

export enum InputType {
  email = "email",
  password = "password",
  text = "text",
  number = "number",
  tel = "tel",
  url = "url",
}

export enum DateInputType {
  date = "date",
  datetime = "datetime-local",
  month = "month",
  time = "time",
  week = "week",
}

export enum Colours {
  primary = "primary",
  accent = "accent",
  success = "success",
  danger = "danger",
  warning = "warning",
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
