export class DataFrame {
  columns: string[];
  data: { [key: string]: number | string }[];

  constructor(columns: string[], data: { [key: string]: number | string }[]) {
    this.columns = columns;
    this.data = data;
  }
}