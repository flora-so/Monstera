import { FontWeight, Theme } from ".";

export interface ColourScheme {
  primary?: Colour;
  secondary?: Colour;
  tertiary?: Colour;
  info?: Colour;
  success?: Colour;
  warning?: Colour;
  danger?: Colour;
  background?: Colour;
}

export interface TextStyle {
  fontFamily?: string[];
  fontSize?: `${number}px` | `${number}rem` | "unset";
  fontWeight?: FontWeight;
  colour?: Colour;
  lineHeight?: `${number}px` | `${number}rem` | "normal";
  letterSpacing?: `${number}px` | `${number}rem` | "normal";
}

export interface Typography {
  title?: TextStyle;
  heading?: TextStyle;
  label?: TextStyle;
  body?: TextStyle;
}

export interface ThemeData {
  theme: Theme;
  colourScheme?: ColourScheme;
  typography?: Typography;
}

export class Colour {
  value: string;
  constructor(hex: string) {
    if (/^#([A-Fa-f0-9]{3,4}|([A-Fa-f0-9]{2}){3,4})$/.test(hex)) {
      this.value = hex;
    } else {
      this.value = "red";
    }
  }

  static fromRGBO(r: number, g: number, b: number, o?: number) {
    if (!!o && o <= 1 && o >= 0) {
      return new Colour(
        `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}${Math.round(o * 0xff).toString(16).padStart(2, "0")}`
      );
    } else {
      return new Colour(
        `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
      );
    }
  }

  static fromARGB(a: number, r: number, g: number, b: number) {
    return new Colour(
      `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`
    );
  }
}

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