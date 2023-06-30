export type CellValue = 'empty' | 'filled' | 'flagged';

export type Cell = {
  col: number;
  row: number;
  value: CellValue;
};
