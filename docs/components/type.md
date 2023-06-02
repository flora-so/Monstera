# Types

## DataFrame

```jsx
export class DataFrame {
  columns: string[];
  data: { [key: string]: number | string }[];

  constructor(columns: string[], data: { [key: string]: number | string }[]) {
    this.columns = columns;
    this.data = data;
  }
}
```

## Informative Context

```jsx
export type InformativeContext = {
  show: () => void,
  hide: () => void,
}
```

## Text Field Type

```jsx
export enum TextFieldType {
  email = "email",
  password = "password",
  text = "text",
  number = "number",
  tel = "tel",
  url = "url",
}
```

## Text Field Context

```jsx
export type TextFieldContext = {
  value: () => string,
  validate: () => void,
  focus: () => void,
  setError: (message: string) => void,
}
```

## Text Field Validator

```jsx
export type TextFieldValidator = (value: string) => string;
```

## Dropdown Item

```jsx
export type DropdownItem = {
  label: string,
  value: string,
  colour?: string,
}
```

## Dropdown Alignment

```jsx
export enum DropdownAlignment {
  left = "ltr",
  right = "rtl"
}
```

## Dropdown Position

```jsx
export enum DropdownPosition {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}
```

## Colours

```jsx
export enum Colours {
  primary = "primary",
  accent = "accent",
  success = "success",
  danger = "danger",
  warning = "warning",
}
```

## Theme

```jsx
export enum Theme {
  light = "light",
  dark = "dark",
}
```
