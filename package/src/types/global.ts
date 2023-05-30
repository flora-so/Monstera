export class DataFrame {
  id: string[];
  columns: string[];
  private _data: { [key: string]: number | string, id: string }[];

  constructor(columns: string[], data: { [key: string]: number | string, id: string }[]) {
    this.columns = columns;
    this._data = data;

    this.id = this._data.map(d => d.id);
  }

  set data(value: { [key: string]: number | string, id: string }[]) {
    this._data = value;

    this.id = this._data.map(d => d.id);
  }

  get data() {
    return this._data;
  }

  get length() {
    return this._data.length;
  }


  find(id: string) {
    const index = this.id.indexOf(id);

    if (index === -1) {
      return null;
    }

    return this._data[index];
  }

  slice(start: number, end?: number) {
    return new DataFrame(this.columns, this._data.slice(start, end));
  }
}

export type OverlayContext = {
  show: () => void,
  hide: () => void,
}

export enum InjectedKeys {
  theme = "msr__theme",
  loading = "msr__loading",
  snackbar = "msr__snackbar",
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

export type ActionItem = {
  label: string,
  method: (data: any) => void,
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